const PARTS = ['Frontend', 'Backend', 'Design'];
const SKILLS_POOL = ['JavaScript', 'React', 'Node.js', 'Figma', 'CSS Grid', 'TypeScript', 'GraphQL', 'HTML/CSS'];

let _idCounter = 0;
export function createId() {
  return `lion_${Date.now()}_${_idCounter++}`;
}

export function transformUser(user) {
  const part = PARTS[Math.floor(Math.random() * PARTS.length)];
  const skills = [...SKILLS_POOL].sort(() => Math.random() - 0.5).slice(0, 3);
  const name = `${user.name.first} ${user.name.last}`;
  const city = user.location.city;
  const country = user.location.country;

  return {
    id: createId(),
    name,
    part,
    skills,
    intro: `${part} · ${country} ${city}에서 합류했어요!`,
    bio: `${part} 파트로 합류한 ${name}입니다. ${country} ${city} 출신으로, 함께 성장해나가고 싶습니다.`,
    email: user.email,
    phone: user.phone,
    website: `https://example.com/${user.login.username}`,
    motto: `${part}에서 최선을 다하겠습니다!`,
    image: user.picture.large,
    isMe: false,
  };
}

export function applyViewOptions(lions, { part, sort, search }) {
  let result = [...lions];

  if (part !== '전체') {
    result = result.filter(l => l.part === part);
  }

  const q = search.trim().toLowerCase();
  if (q) {
    result = result.filter(l => l.name.toLowerCase().includes(q));
  }

  if (sort === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
  }

  return result;
}