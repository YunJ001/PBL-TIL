const btnAdd = document.getElementById('btn-add');
const btnDelete = document.getElementById('btn-delete');
const totalCountEl = document.getElementById('total-count');
const formContainer = document.getElementById('add-form-container');
const btnSubmit = document.getElementById('btn-submit');
const btnCancel = document.getElementById('btn-cancel');
const summaryGrid = document.getElementById('summary-grid');
const detailList = document.getElementById('detail-list');

const inputName = document.getElementById('input-name');
const inputPart = document.getElementById('input-part');
const inputSkills = document.getElementById('input-skills');
const inputIntro = document.getElementById('input-intro');
const inputBio = document.getElementById('input-bio');
const inputEmail = document.getElementById('input-email');
const inputPhone = document.getElementById('input-phone');
const inputWebsite = document.getElementById('input-website');
const inputMotto = document.getElementById('input-motto');

const lions = [];

const initialCards = summaryGrid.querySelectorAll('.summary-card');
initialCards.forEach(function (card) {
    const skillsRaw = card.dataset.skills;
    lions.push({
        name: card.dataset.name,
        part: card.dataset.part,
        skills: skillsRaw.split(',').map(function (s) { return s.trim(); }),
        intro: card.dataset.intro,
        bio: card.dataset.bio,
        email: card.dataset.email,
        phone: card.dataset.phone,
        website: card.dataset.website,
        motto: card.dataset.motto,
        image: card.dataset.image,
    });
});

function createSummaryCard(lion, index) {
    const article = document.createElement('article');
    article.className = 'summary-card' + (index === 0 ? ' my-card' : '');

    const badge = lion.skills.length > 0 ? lion.skills[0] : '';

    article.innerHTML = `
        <div class="image-container">
            <img src="${lion.image}" alt="프로필">
            <span class="badge">${badge}</span>
        </div>
        <div class="summary-info">
            <h3>${lion.name}</h3>
            <p class="part">${lion.part}</p>
            <p class="intro">${lion.intro}</p>
        </div>
    `;
    return article;
}

function createDetailCard(lion) {
    const article = document.createElement('article');
    article.className = 'detail-card';

    const skillItems = lion.skills.map(function (s) { return '<li>' + s + '</li>'; }).join('');

    article.innerHTML = `
        <h2>${lion.name}</h2>
        <p class="track-info"><span>${lion.part}</span> | LION TRACK</p>
        <div class="detail-content">
            <h4>자기소개</h4>
            <p>${lion.bio}</p>
        </div>
        <div class="detail-content">
            <h4>연락처</h4>
            <ul>
                <li>Email: ${lion.email}</li>
                <li>Phone: ${lion.phone}</li>
                <li><a href="${lion.website}" target="_blank">${lion.website}</a></li>
            </ul>
        </div>
        <div class="detail-content">
            <h4>관심 기술</h4>
            <ul>${skillItems}</ul>
        </div>
        <div class="detail-content">
            <h4>한 마디</h4>
            <p class="motto">${lion.motto}</p>
        </div>
    `;
    return article;
}

function render() {
    summaryGrid.innerHTML = '';
    detailList.innerHTML = '';

    lions.forEach(function (lion, index) {
        summaryGrid.appendChild(createSummaryCard(lion, index));
        detailList.appendChild(createDetailCard(lion));
    });

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

    if (!inputEmail.checkValidity()) {
        inputEmail.reportValidity();
        return;
    }

    if (!inputWebsite.checkValidity()) {
        inputWebsite.reportValidity();
        return;
    }

    const skillsRaw = inputSkills.value.split(',').map(function (s) { return s.trim(); }).filter(function (s) { return s.length > 0; });

    const newLion = {
        name: inputName.value.trim(),
        part: inputPart.value,
        skills: skillsRaw,
        intro: inputIntro.value.trim(),
        bio: inputBio.value.trim(),
        email: inputEmail.value.trim(),
        phone: inputPhone.value.trim(),
        website: inputWebsite.value.trim(),
        motto: inputMotto.value.trim(),
        image: 'https://i.imgur.com/GO50UpY.png',
    };

    lions.push(newLion);
    render();
    closeForm();
});

btnDelete.addEventListener('click', function () {
    if (lions.length === 0) return;
    lions.pop();
    render();
});

render();