import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { transformUser } from '../utils/lionUtils';
import useFetch from './useFetch';
import type { Lion, RandomUserResponse, FetchStatus } from '../types/lion';
import type { Database } from '../types/database';

type LionRow = Database['public']['Tables']['lions']['Row'];

const API_URL = (n: number): string =>
  `https://randomuser.me/api/?results=${n}&nat=us,gb,ca,au,nz`;

function rowToLion(row: LionRow): Lion {
  return {
    id: row.id,
    name: row.name,
    part: row.part as Lion['part'],
    skills: row.skills ?? [],
    intro: row.intro ?? '',
    bio: row.bio ?? '',
    email: row.email ?? '',
    phone: row.phone ?? '',
    website: row.website ?? '',
    motto: row.motto ?? '',
    image: row.image ?? '',
    isMe: row.is_me,
  };
}

function lionToInsert(lion: Omit<Lion, 'id'>) {
  return {
    name: lion.name,
    part: lion.part,
    skills: lion.skills,
    intro: lion.intro,
    bio: lion.bio,
    email: lion.email,
    phone: lion.phone,
    website: lion.website,
    motto: lion.motto,
    image: lion.image,
    is_me: lion.isMe,
  };
}

interface UseLionsReturn {
  lions: Lion[];
  fetchStatus: FetchStatus;
  fetchErrorMsg: string;
  addLion: (lion: Omit<Lion, 'id'>) => void;
  deleteLast: () => void;
  addRandom: (count: number) => void;
  refresh: () => void;
  retry: () => void;
}

function useLions(): UseLionsReturn {
  const [lions, setLions] = useState<Lion[]>([]);
  const { status, errorMsg, execute, retry } = useFetch();

  // 앱 시작 시 Supabase에서 데이터 불러오기
  useEffect(() => {
    execute(async () => {
      const { data, error } = await supabase
        .from('lions')
        .select('*')
        .order('created_at', { ascending: true });
      if (error) throw new Error(error.message);
      setLions((data ?? []).map(rowToLion));
    });
  }, []);

  function addLion(lion: Omit<Lion, 'id'>): void {
    execute(async () => {
      const { data, error } = await supabase
        .from('lions')
        .insert(lionToInsert(lion))
        .select()
        .single();
      if (error) throw new Error(error.message);
      if (data) setLions(prev => [...prev, rowToLion(data)]);
    });
  }

  function deleteLast(): void {
    if (lions.length === 0) return;
    const last = lions[lions.length - 1];
    execute(async () => {
      const { error } = await supabase.from('lions').delete().eq('id', last.id);
      if (error) throw new Error(error.message);
      setLions(prev => prev.slice(0, -1));
    });
  }

  function addRandom(count: number): void {
    execute(async () => {
      const res = await fetch(API_URL(count));
      if (!res.ok) throw new Error('네트워크 오류');
      const data: RandomUserResponse = await res.json();
      const newLions = data.results.map(transformUser);

      const { data: inserted, error } = await supabase
        .from('lions')
        .insert(newLions.map(lionToInsert))
        .select();
      if (error) throw new Error(error.message);
      setLions(prev => [...prev, ...(inserted ?? []).map(rowToLion)]);
    });
  }

  function refresh(): void {
    const myCards = lions.filter(l => l.isMe);
    const fetchCount = Math.max(lions.length - myCards.length, 1);

    execute(async () => {
      const nonMyIds = lions.filter(l => !l.isMe).map(l => l.id);
      if (nonMyIds.length > 0) {
        const { error } = await supabase.from('lions').delete().in('id', nonMyIds);
        if (error) throw new Error(error.message);
      }

      const res = await fetch(API_URL(fetchCount));
      if (!res.ok) throw new Error('네트워크 오류');
      const data: RandomUserResponse = await res.json();
      const newLions = data.results.slice(0, fetchCount).map(transformUser);

      const { data: inserted, error: insertError } = await supabase
        .from('lions')
        .insert(newLions.map(lionToInsert))
        .select();
      if (insertError) throw new Error(insertError.message);
      setLions([...(inserted ?? []).map(rowToLion), ...myCards]);
    });
  }

  return { lions, fetchStatus: status, fetchErrorMsg: errorMsg, addLion, deleteLast, addRandom, refresh, retry };
}

export default useLions;