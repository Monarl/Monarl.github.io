function getConfig() {
  return window.SITE_CONFIG;
}

function statusClass(status) {
  const text = (status || '').toLowerCase();
  if (text.includes('progress')) return 'in-progress';
  if (text.includes('soon')) return 'coming-soon';
  return '';
}

function linkMarkup(label, url, placeholder) {
  const safeLabel = label || 'Link';
  if (url) {
    return `
      <a class="placeholder-link active" href="${url}" target="_blank" rel="noreferrer">
        <strong>${safeLabel}</strong>
        <span>Open link ↗</span>
      </a>`;
  }
  return `
    <div class="placeholder-link">
      <strong>${safeLabel}</strong>
      <span>${placeholder}</span>
    </div>`;
}

function renderHome() {
  const config = getConfig();
  if (!config) return;

  document.title = config.siteTitle;
  document.querySelectorAll('[data-site-title]').forEach(el => el.textContent = config.siteTitle);
  document.querySelectorAll('[data-course-title]').forEach(el => el.textContent = `${config.courseCode} - ${config.courseTitle}`);
  document.querySelectorAll('[data-group-name]').forEach(el => el.textContent = config.groupName);
  document.querySelectorAll('[data-instructor]').forEach(el => el.textContent = config.instructor);
  document.querySelectorAll('[data-semester]').forEach(el => el.textContent = config.semester);
  document.querySelectorAll('[data-university]').forEach(el => el.textContent = config.university);

  const membersEl = document.getElementById('member-list');
  if (membersEl) {
    membersEl.innerHTML = config.members.map(member => `
      <li class="member-item"><span class="member-dot"></span><span>${member}</span></li>
    `).join('');
  }

  const assignmentsEl = document.getElementById('assignment-cards');
  if (assignmentsEl) {
    assignmentsEl.innerHTML = config.assignments.map(item => `
      <article class="card assignment-card">
        <div class="assignment-top">
          <div>
            <div class="assignment-meta">
              <span class="meta-badge">${item.shortTitle || item.title}</span>
            </div>
            <h4>${item.title}</h4>
          </div>
          <span class="status-pill ${statusClass(item.status)}">${item.status || 'Planned'}</span>
        </div>
        <div class="assignment-meta">
          <span class="meta-badge">${item.theme || 'Update later'}</span>
        </div>
        <p class="assignment-summary">${item.summary || ''}</p>
        <div class="assignment-actions">
          <a class="button-secondary" href="${item.page}">Open page</a>
          <a class="button-ghost" href="#publish-guide">Publishing guide</a>
        </div>
      </article>
    `).join('');
  }

  const deadlinesEl = document.getElementById('deadline-timeline');
  if (deadlinesEl) {
    const a1 = config.assignments.find(item => item.id === 'assignment-1');
    const rows = [];
    if (a1?.dates?.report1) {
      rows.push(`
        <div class="timeline-item">
          <div class="timeline-date">${a1.dates.report1}</div>
          <div>
            <strong>Assignment 1 - Report 1</strong>
            <div class="muted">50% of presentation grade for the first report round.</div>
          </div>
        </div>
      `);
    }
    if (a1?.dates?.final) {
      rows.push(`
        <div class="timeline-item">
          <div class="timeline-date">${a1.dates.final}</div>
          <div>
            <strong>Assignment 1 - Final report</strong>
            <div class="muted">Final presentation report submission deadline.</div>
          </div>
        </div>
      `);
    }
    deadlinesEl.innerHTML = rows.join('');
  }

  const quickEditEl = document.getElementById('quick-edit-code');
  if (quickEditEl) {
    quickEditEl.textContent = `// docs/assets/config.js\nwindow.SITE_CONFIG.assignments[0].links.demoVideo = 'PASTE_LINK_HERE';\nwindow.SITE_CONFIG.assignments[0].links.presentationVideo = 'PASTE_LINK_HERE';\nwindow.SITE_CONFIG.assignments[0].links.code = 'PASTE_LINK_HERE';\nwindow.SITE_CONFIG.assignments[0].links.presentationContent = 'PASTE_LINK_HERE';`;
  }
}

function renderAssignmentPage(assignmentId) {
  const config = getConfig();
  if (!config) return;
  const assignment = config.assignments.find(item => item.id === assignmentId);
  if (!assignment) return;

  document.title = `${assignment.title} - ${config.groupName}`;

  const fillText = (selector, value) => {
    document.querySelectorAll(selector).forEach(el => el.textContent = value);
  };

  fillText('[data-group-name]', config.groupName);
  fillText('[data-instructor]', config.instructor);
  fillText('[data-assignment-title]', assignment.title);
  fillText('[data-assignment-theme]', assignment.theme || 'Update later');
  fillText('[data-assignment-summary]', assignment.summary || '');
  fillText('[data-course-title]', `${config.courseCode} - ${config.courseTitle}`);
  fillText('[data-status]', assignment.status || 'Planned');
  fillText('[data-university]', config.university);

  const membersEl = document.getElementById('assignment-members');
  if (membersEl) {
    membersEl.innerHTML = config.members.map(member => `
      <li class="member-item"><span class="member-dot"></span><span>${member}</span></li>
    `).join('');
  }

  const linksEl = document.getElementById('assignment-links');
  if (linksEl) {
    linksEl.innerHTML = [
      linkMarkup('Demo video', assignment.links?.demoVideo, 'Add the demo video URL later'),
      linkMarkup('Presentation video', assignment.links?.presentationVideo, 'Add the YouTube presentation URL later'),
      linkMarkup('Code repository', assignment.links?.code, 'Add the GitHub repository URL later'),
      linkMarkup('Presentation content', assignment.links?.presentationContent, 'Add the slides or report URL later')
    ].join('');
  }

  const deliverablesEl = document.getElementById('assignment-deliverables');
  if (deliverablesEl) {
    deliverablesEl.innerHTML = (assignment.deliverables || []).map(item => `
      <li class="deliverable-item"><span class="deliverable-dot"></span><span>${item}</span></li>
    `).join('');
  }

  const datesEl = document.getElementById('assignment-dates');
  if (datesEl) {
    const rows = [];
    if (assignment.dates?.report1) {
      rows.push(`
        <div class="table-row">
          <div>
            <strong>Report 1</strong>
            <div class="muted">First presentation grading milestone</div>
          </div>
          <div>${assignment.dates.report1}</div>
        </div>
      `);
    }
    if (assignment.dates?.final) {
      rows.push(`
        <div class="table-row">
          <div>
            <strong>Final report</strong>
            <div class="muted">Final presentation grading milestone</div>
          </div>
          <div>${assignment.dates.final}</div>
        </div>
      `);
    }
    datesEl.innerHTML = rows.length ? rows.join('') : '<div class="inline-note">Add deadlines here when the course announces them.</div>';
  }

  const editCodeEl = document.getElementById('assignment-edit-code');
  if (editCodeEl) {
    editCodeEl.textContent = `// docs/assets/config.js\nconst item = window.SITE_CONFIG.assignments.find(a => a.id === '${assignmentId}');\nitem.links.demoVideo = 'PASTE_LINK_HERE';\nitem.links.presentationVideo = 'PASTE_LINK_HERE';\nitem.links.code = 'PASTE_LINK_HERE';\nitem.links.presentationContent = 'PASTE_LINK_HERE';`;
  }

  const statusEl = document.getElementById('status-pill');
  if (statusEl) {
    statusEl.className = `status-pill ${statusClass(assignment.status)}`;
    statusEl.textContent = assignment.status || 'Planned';
  }
}
