let skills = [];
let profileImage = "";

// CHAR COUNTER
summary.addEventListener("input", () => {
  charCount.innerText = summary.value.length + "/500";
  generateResume();
});

// PROFILE IMAGE
function loadPhoto(event) {
  const reader = new FileReader();
  reader.onload = function () {
    profileImage = reader.result;
    photoPreview.src = profileImage;
    photoPreview.classList.remove("d-none");
    generateResume();
  };
  if(event.target.files[0]) reader.readAsDataURL(event.target.files[0]);
}

// SKILLS
function addSkill() {
  if(skillInput.value.trim() !== "") {
    skills.push(skillInput.value.trim());
    skillInput.value = "";
    renderSkills();
    generateResume();
  }
}
function renderSkills() {
  skillsContainer.innerHTML = "";
  skills.forEach((s,i)=> {
    skillsContainer.innerHTML += `<span class="badge">${s}<button class="btn-close btn-close-white btn-sm ms-2" onclick="removeSkill(${i})"></button></span>`;
  });
}
function removeSkill(i) {
  skills.splice(i,1);
  renderSkills();
  generateResume();
}

// EXPERIENCE
function addExperience() {
  experienceContainer.innerHTML += `
  <div class="border p-3 mb-3 exp-item rounded">
    <input class="form-control mb-2 exp-company" placeholder="Company" oninput="generateResume()">
    <input class="form-control mb-2 exp-title" placeholder="Job Title" oninput="generateResume()">
    <div class="row mb-2">
      <div class="col-md-6"><input type="month" class="form-control exp-start" oninput="generateResume()"></div>
      <div class="col-md-6"><input type="month" class="form-control exp-end" oninput="generateResume()"></div>
    </div>
    <div class="form-check mb-2"><input type="checkbox" class="form-check-input exp-current" onchange="toggleEndDate(this)"><label class="form-check-label">Currently Working</label></div>
    <textarea class="form-control mb-2 exp-desc" placeholder="Responsibilities" oninput="generateResume()"></textarea>
    <button type="button" class="btn btn-sm btn-danger" onclick="this.parentElement.remove(); generateResume()">Remove</button>
  </div>`;
}
function toggleEndDate(chk){const endInput=chk.closest(".exp-item").querySelector(".exp-end");endInput.disabled=chk.checked;if(chk.checked)endInput.value="";generateResume();}

// EDUCATION
function addEducation() {
  educationContainer.innerHTML += `
  <div class="border p-3 mb-3 edu-item rounded">
    <input class="form-control mb-2 edu-inst" placeholder="Institution" oninput="generateResume()">
    <input class="form-control mb-2 edu-degree" placeholder="Degree" oninput="generateResume()">
    <div class="row mb-2"><div class="col-md-6"><input type="number" class="form-control edu-start" placeholder="Start Year" oninput="generateResume()"></div>
    <div class="col-md-6"><input type="number" class="form-control edu-end" placeholder="End Year" oninput="generateResume()"></div></div>
    <input class="form-control mb-2 edu-score" placeholder="Score" oninput="generateResume()">
    <button type="button" class="btn btn-sm btn-danger" onclick="this.parentElement.remove(); generateResume()">Remove</button>
  </div>`;
}

// PROJECTS
function addProject() {
  projectContainer.innerHTML += `
  <div class="border p-3 mb-3 proj-item rounded">
    <input class="form-control mb-2 proj-title" placeholder="Project Title" oninput="generateResume()">
    <input class="form-control mb-2 proj-tech" placeholder="Tech Stack" oninput="generateResume()">
    <textarea class="form-control mb-2 proj-desc" placeholder="Description" oninput="generateResume()"></textarea>
    <input class="form-control mb-2 proj-link" placeholder="Live / Repo Link" oninput="generateResume()">
    <button type="button" class="btn btn-sm btn-danger" onclick="this.parentElement.remove(); generateResume()">Remove</button>
  </div>`;
}

// CERTIFICATIONS
function addCertification() {
  certContainer.innerHTML += `
  <div class="border p-3 mb-3 cert-item rounded">
    <div class="row g-2">
      <div class="col-md-6"><input type="text" class="form-control cert-name" placeholder="Certification Name" oninput="generateResume()"></div>
      <div class="col-md-3"><input type="number" class="form-control cert-year" placeholder="Year" oninput="generateResume()"></div>
      <div class="col-md-3"><input type="url" class="form-control cert-url" placeholder="URL" oninput="generateResume()"></div>
    </div>
    <button type="button" class="btn btn-sm btn-danger mt-2" onclick="this.parentElement.remove(); generateResume()">Remove</button>
  </div>`;
}

// GENERATE RESUME
function generateResume() {
  resumeForm.classList.add("was-validated");
  if(!fullName.value||!email.value||!phone.value||!summary.value) return;

  // Skills
  let skillHTML = "";
  if(skills.length) skillHTML = "<hr><h5>Skills</h5>"+skills.map(s=>`<span class="badge">${s}</span>`).join("");

  // Left Column (Profile)
  let left = `
    ${profileImage ? `<div class="text-center mb-3"><img src="${profileImage}" width="120" class="rounded-circle"></div>` : ""}
    <h2>${fullName.value}</h2>
    <h5>${role.value}</h5>
    <p>${phone.value}<br>${email.value}<br>${location.value || ""}<br>${linkedin.value ? `<a href="${linkedin.value}" target="_blank">LinkedIn</a>` : ""}<br>${github.value ? `<a href="${github.value}" target="_blank">Portfolio</a>` : ""}</p>
    ${skillHTML}
  `;

  // Right Column (Main Sections)
  let right = `
    <div class="resume-section">
      <h5>Summary</h5>
      <p>${summary.value}</p>
    </div>
  `;

  // Experience
  let expHTML = "";
  document.querySelectorAll(".exp-item").forEach(item=>{
    const title=item.querySelector(".exp-title").value;
    const company=item.querySelector(".exp-company").value;
    const start=item.querySelector(".exp-start").value;
    const end=item.querySelector(".exp-current").checked?"Present":item.querySelector(".exp-end").value;
    const desc=item.querySelector(".exp-desc").value;
    if(title||company) expHTML += `<div class="exp-item-preview"><strong>${title}</strong> - ${company}<br><small>${start} - ${end}</small><p>${desc}</p></div>`;
  });
  if(expHTML) right+="<hr><h5>Experience</h5>"+expHTML;

  // Education
  let eduHTML="";
  document.querySelectorAll(".edu-item").forEach(item=>{
    const degree=item.querySelector(".edu-degree").value;
    const inst=item.querySelector(".edu-inst").value;
    const start=item.querySelector(".edu-start").value;
    const end=item.querySelector(".edu-end").value;
    const score=item.querySelector(".edu-score").value;
    if(inst||degree) eduHTML+=`<div class="edu-item-preview"><strong>${degree}</strong> - ${inst}<br><small>${start} - ${end}</small>${score?`<div>Score: ${score}</div>`:""}</div>`;
  });
  if(eduHTML) right+="<hr><h5>Education</h5>"+eduHTML;

  // Projects
  let projHTML="";
  document.querySelectorAll(".proj-item").forEach(item=>{
    const title=item.querySelector(".proj-title").value;
    const tech=item.querySelector(".proj-tech").value;
    const desc=item.querySelector(".proj-desc").value;
    const link=item.querySelector(".proj-link").value;
    if(title) projHTML+=`<div class="proj-item-preview"><strong>${title}</strong> - ${tech}<p>${desc}</p>${link?`<a href="${link}" target="_blank">Link</a>`:""}</div>`;
  });
  if(projHTML) right+="<hr><h5>Projects</h5>"+projHTML;

  // Certifications
  let certHTML="";
  document.querySelectorAll(".cert-item").forEach(item=>{
    const name=item.querySelector(".cert-name").value;
    const year=item.querySelector(".cert-year").value;
    const url=item.querySelector(".cert-url").value;
    if(name) certHTML+=`<div class="cert-item-preview">${name} (${year}) ${url?`<a href="${url}" target="_blank">Link</a>`:""}</div>`;
  });
  if(certHTML) right+="<hr><h5>Certifications</h5>"+certHTML;

  resumePreview.innerHTML=`<div class="resume-container"><div class="resume-left">${left}</div><div class="resume-right">${right}</div></div>`;
}

// CLEAR FORM
function clearForm() {
  skills=[];profileImage="";resumeForm.reset();skillsContainer.innerHTML="";photoPreview.classList.add("d-none");resumePreview.innerHTML="<h3 class='text-center text-muted'>Resume Preview</h3>";
}

// AUTO-GENERATE
resumeForm.querySelectorAll("input,textarea").forEach(el=>el.addEventListener("input",generateResume));