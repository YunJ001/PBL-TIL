const btnAdd = document.getElementById('btn-add');
const btnDelete = document.getElementById('btn-delete');
const totalCountEl = document.getElementById('total-count');
const formContainer = document.getElementById('add-form-container');
const btnSubmit = document.getElementById('btn-submit');
const btnCancel = document.getElementById('btn-cancel');
const btnRandomFill = document.getElementById('btn-random-fill');
const summaryGrid = document.getElementById('summary-grid');
const detailList = document.getElementById('detail-list');
const btnFetch1 = document.getElementById('btn-fetch-1');
const btnFetch5 = document.getElementById('btn-fetch-5');
const btnRefresh = document.getElementById('btn-refresh');
const fetchStatus = document.getElementById('fetch-status');
const btnRetry = document.getElementById('btn-retry');
const filterPart = document.getElementById('filter-part');
const sortOrder = document.getElementById('sort-order');
const searchInput = document.getElementById('search-input');
const inputName = document.getElementById('input-name');
const inputPart = document.getElementById('input-part');
const inputSkills = document.getElementById('input-skills');
const inputIntro = document.getElementById('input-intro');
const inputBio = document.getElementById('input-bio');
const inputEmail = document.getElementById('input-email');
const inputPhone = document.getElementById('input-phone');
const inputWebsite = document.getElementById('input-website');
const inputMotto = document.getElementById('input-motto');

const RANDOM_SKILLS = [
    ['JavaScript', 'React', 'HTML/CSS'],
    ['Node.js', 'Express', 'MongoDB'],
    ['Figma', 'Adobe XD', 'UI/UX'],
    ['TypeScript', 'Next.js', 'React'],
    ['Python', 'Django', 'PostgreSQL'],
    ['Java', 'Spring', 'MySQL'],
    ['CSS Grid', 'Flexbox', 'Sass'],
    ['GraphQL', 'Apollo', 'REST API'],
    ['Design Tokens', 'Sketch', 'Prototyping'],
    ['Vue.js', 'Nuxt', 'Tailwind'],
];
const PARTS = ['Frontend', 'Backend', 'Design'];

let lastFetchFn = null;
let isFetching = false;

const lions = [];

const initialCards = summaryGrid.querySelectorAll('.summary-card');
initialCards.forEach(card => {
    const skillsRaw = card.dataset.skills;
    lions.push({
        name: card.dataset.name,
        part: card.dataset.part,
        skills: skillsRaw.split(',').map(s => s.trim()),
        intro: card.dataset.intro,
        bio: card.dataset.bio,
        email: card.dataset.email,
        phone: card.dataset.phone,
        website: card.dataset.website,
        motto: card.dataset.motto,
        image: card.dataset.image,
        isMe: card.classList.contains('my-card'),
    });
});

const API_URL = 'https://randomuser.me/api/?results=';

function randomSkills() {
    return RANDOM_SKILLS[Math.floor(Math.random() * RANDOM_SKILLS.length)];
}
function randomPart() {
    return PARTS[Math.floor(Math.random() * PARTS.length)];
}

function convertUser(user) {
    const part = randomPart();
    const skills = randomSkills();
    const name = user.name.first + ' ' + user.name.last;
    return {
        name: name,
        part: part,
        skills: skills,
        intro: part + ' · ' + user.location.country + ' ' + user.location.city + '에서 합류했어요!',
        bio: '4주차 미션에서 fetch로 데이터를 불러와 상태(lions)를 업데이트하는 연습을 하고 있습니다. 비동기(async/await)로 받아온 데이터를 map으로 변환해 UI에 반영하는 흐름을 이해하려고 합니다. 목표는 "데이터가 바뀌면 UI를 다시 그리는 구조"를 자연스럽게 체득하는 것입니다.',
        email: user.email,
        phone: user.phone,
        website: 'https://example.com/' + user.login.username,
        motto: '데이터가 바뀌면 UI도 바뀐다!',
        image: user.picture.large,
        isMe: false,
    };
}

function setFetchButtons(disabled) {
    btnFetch1.disabled  = disabled;
    btnFetch5.disabled  = disabled;
    btnRefresh.disabled = disabled;
    isFetching          = disabled;
}

function setStatus(state, message) {
    fetchStatus.textContent = message;
    fetchStatus.className   = 'fetch-status ' + state;

    if (state === 'error') {
        btnRetry.classList.remove('hidden');
    } else {
        btnRetry.classList.add('hidden');
    }

    if (state === 'success') {
        setTimeout(function () {
            fetchStatus.textContent = '준비 완료';
            fetchStatus.className   = 'fetch-status';
        }, 2000);
    }
}

async function fetchUsers(count, mode) {
    if (isFetching) return;

    lastFetchFn = function () { return fetchUsers(count, mode); };

    setFetchButtons(true);
    setStatus('loading', '불러오는 중...');

    try {
        const response = await fetch(API_URL + count + '&nat=us,gb,ca,au,nz');
        if (!response.ok) throw new Error('HTTP ' + response.status);
        const data  = await response.json();
        const users = data.results.map(convertUser);

        if (mode === 'add') {
            users.forEach(function (u) { lions.push(u); });
        } else if (mode === 'refresh') {
            const myCards   = lions.filter(function (l) { return l.isMe; });
            const otherCount = lions.length - myCards.length;
            lions.length = 0;
            myCards.forEach(function (m) { lions.push(m); });
            users.forEach(function (u) { lions.push(u); });
        }

        renderAll();
        setStatus('success', '완료!');
    } catch (err) {
        setStatus('error', '불러오기 실패: ' + err.message);
    } finally {
        setFetchButtons(false);
    }
}

function getFilteredList() {
    const partVal = filterPart.value;
    const sortVal = sortOrder.value;
    const searchVal = searchInput.value.trim().toLowerCase();

    let list = lions.slice();

    if (partVal !== '전체') {
        list = list.filter(function (l) { return l.part === partVal; });
    }

    if (searchVal) {
        list = list.filter(function (l) {
            return l.name.toLowerCase().includes(searchVal);
        });
    }

    if (sortVal === 'name') {
        list.sort(function (a, b) { return a.name.localeCompare(b.name); });
    }

    return list;
}

function createSummaryCard(lion) {
    const article = document.createElement('article');
    article.className = 'summary-card' + (lion.isMe ? ' my-card' : '');

    const badge = lion.skills.length > 0 ? lion.skills[0] : '';

    article.innerHTML =
        '<div class="image-container">' +
            '<img src="' + lion.image + '" alt="프로필">' +
            '<span class="badge">' + badge + '</span>' +
        '</div>' +
        '<div class="summary-info">' +
            '<h3>' + lion.name + '</h3>' +
            '<p class="part">' + lion.part + '</p>' +
            '<p class="intro">' + lion.intro + '</p>' +
        '</div>';

    return article;
}

function createDetailCard(lion) {
    const article = document.createElement('article');
    article.className = 'detail-card';

    const skillItems = lion.skills.map(function (s) { return '<li>' + s + '</li>'; }).join('');

    article.innerHTML =
        '<h2>' + lion.name + '</h2>' +
        '<p class="track-info"><span>' + lion.part + '</span> | LION TRACK</p>' +
        '<div class="detail-content"><h4>자기소개</h4><p>' + lion.bio + '</p></div>' +
        '<div class="detail-content"><h4>연락처</h4><ul>' +
            '<li>Email: ' + lion.email + '</li>' +
            '<li>Phone: ' + lion.phone + '</li>' +
            '<li><a href="' + lion.website + '" target="_blank">' + lion.website + '</a></li>' +
        '</ul></div>' +
        '<div class="detail-content"><h4>관심 기술</h4><ul>' + skillItems + '</ul></div>' +
        '<div class="detail-content"><h4>한 마디</h4><p class="motto">' + lion.motto + '</p></div>';

    return article;
}

function renderAll() {
    const list = getFilteredList();

    summaryGrid.innerHTML = '';
    detailList.innerHTML  = '';

    if (list.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'empty-state';
        empty.textContent = '표시할 아기 사자가 없습니다. (필터/검색 조건을 확인해 주세요)';
        summaryGrid.appendChild(empty);
    } else {
        list.forEach(function (lion, idx) {
            summaryGrid.appendChild(createSummaryCard(lion, idx === 0));
            detailList.appendChild(createDetailCard(lion));
        });
    }

    totalCountEl.textContent = '총 ' + lions.length + '명';
}

function openForm() {
    formContainer.classList.remove('hidden');
    btnAdd.classList.add('active');
}

function closeForm() {
    formContainer.classList.add('hidden');
    btnAdd.classList.remove('active');
    clearForm();
}

function clearForm() {
    inputName.value = '';
    inputPart.value = 'Frontend';
    inputSkills.value = '';
    inputIntro.value = '';
    inputBio.value = '';
    inputEmail.value = '';
    inputPhone.value = '';
    inputWebsite.value = '';
    inputMotto.value = '';
}

btnAdd.addEventListener('click', function () {
    if (formContainer.classList.contains('hidden')) {
        openForm();
    } else {
        closeForm();
    }
});

btnCancel.addEventListener('click', function () {
    closeForm();
});

btnSubmit.addEventListener('click', function () {
    const fields = [inputName, inputSkills, inputIntro, inputBio, inputEmail, inputPhone, inputWebsite, inputMotto];
    for (var i = 0; i < fields.length; i++) {
        if (!fields[i].value.trim()) {
            fields[i].reportValidity();
            return;
        }
    }
    if (!inputEmail.checkValidity()) { inputEmail.reportValidity(); return; }
    if (!inputWebsite.checkValidity()) { inputWebsite.reportValidity(); return; }

    const skills = inputSkills.value.split(',').map(function (s) { return s.trim(); }).filter(function (s) { return s.length > 0; });

    lions.push({
        name: inputName.value.trim(),
        part: inputPart.value,
        skills: skills,
        intro: inputIntro.value.trim(),
        bio: inputBio.value.trim(),
        email: inputEmail.value.trim(),
        phone: inputPhone.value.trim(),
        website: inputWebsite.value.trim(),
        motto: inputMotto.value.trim(),
        image: 'https://i.imgur.com/GO50UpY.png',
        isMe: false,
    });

    renderAll();
    closeForm();
});

btnDelete.addEventListener('click', function () {
    if (lions.length === 0) return;
    lions.pop();
    renderAll();
});

btnFetch1.addEventListener('click', function () {
    fetchUsers(1, 'add');
});

btnFetch5.addEventListener('click', function () {
    fetchUsers(5, 'add');
});

btnRefresh.addEventListener('click', function () {
    const otherCount = lions.filter(function (l) { return !l.isMe; }).length;
    const count = otherCount > 0 ? otherCount : 9;
    fetchUsers(count, 'refresh');
});

btnRetry.addEventListener('click', function () {
    if (lastFetchFn) lastFetchFn();
});

filterPart.addEventListener('change', renderAll);
sortOrder.addEventListener('change', renderAll);
searchInput.addEventListener('input', renderAll);

btnRandomFill.addEventListener('click', async function () {
    btnRandomFill.disabled = true;
    try {
        const response = await fetch(API_URL + '1&nat=us,gb,ca,au,nz');
        if (!response.ok) throw new Error('HTTP ' + response.status);
        const data = await response.json();
        const user = data.results[0];
        const part = randomPart();
        const skills = randomSkills();

        inputName.value = user.name.first + ' ' + user.name.last;
        inputPart.value = part;
        inputSkills.value = skills.join(', ');
        inputIntro.value = part + ' · ' + user.location.country + ' ' + user.location.city + '에서 합류했어요!';
        inputBio.value = '4주차 미션에서 fetch로 데이터를 불러와 상태(lions)를 업데이트하는 연습을 하고 있습니다. 비동기(async/await)로 받아온 데이터를 map으로 변환해 UI에 반영하는 흐름을 이해하려고 합니다. 목표는 "데이터가 바뀌면 UI를 다시 그리는 구조"를 자연스럽게 체득하는 것입니다.';
        inputEmail.value = user.email;
        inputPhone.value = user.phone;
        inputWebsite.value = 'https://example.com/' + user.login.username;
        inputMotto.value = '데이터가 바뀌면 UI도 바뀐다!';
    } catch (err) {
        alert('랜덤 값 불러오기 실패: ' + err.message);
    } finally {
        btnRandomFill.disabled = false;
    }
});
renderAll();
