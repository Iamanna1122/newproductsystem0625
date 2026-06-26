// LENS PDM v5 — based on "LENS-PDM-改動清單-給Codex".
// Loaded last. Keep existing modules intact and override only requested surfaces.

const LENS_V5_TODAY = '2026-06-26';
const lensV5State = window.lensV5State || {
  progressView: 'gantt',
  ganttScale: 'month',
  calendarDate: '2026-06-01',
  selectedCalendarDay: LENS_V5_TODAY,
  lastAction: null
};
window.lensV5State = lensV5State;

const LENS_V5_STAGES = [
  { id: 1, phase: '需求', phaseId: 'demand', name: '需求與規格確認', unit: 'PM / 業務', role: 'PM', owner: 'PM 曼聿', color: 'pm', desc: '確認產品需求、規格、DIA、含水量與上市目的。', checklist: ['需求來源確認', '規格條件確認', '專案建立完成'] },
  { id: 2, phase: '平光', phaseId: 'plano', name: '模仁設計（平光）', unit: 'CNC', role: 'CNC', owner: 'CNC 鍾民', color: 'cnc', desc: '完成平光模仁設計，確認加工條件。', checklist: ['平光模仁設計完成', '加工條件確認', '預計完成時間已填'] },
  { id: 3, phase: '平光', phaseId: 'plano', name: '平光 PP 模', unit: '製程', role: 'Process', owner: '製程 舜鴻', color: 'process', desc: '製作平光 PP 模，確認可交付研發測試。', checklist: ['PP 模完成', '基本尺寸確認', '交付 RD 確認'] },
  { id: 4, phase: '平光', phaseId: 'plano', name: '平光移印測試', unit: '研發測試', role: 'RD_Print', owner: '研發 士韋', color: 'rd-print', desc: '確認平光移印效果與構型紀錄。', checklist: ['移印測試完成', '圖片/備註已記錄', '移交打樣時間已填'] },
  { id: 5, phase: '平光', phaseId: 'plano', name: '平光臨床試戴與測試', unit: '研發試戴', role: 'RD_Trial', owner: '研發 奇蓁 / 軒毅', color: 'rd-trial', desc: '安排平光臨床試戴與判定；NG 退回 Gate 2。', checklist: ['預計試戴時間已填', '試戴結果已回填', 'OK/NG 判定完成'] },
  { id: 6, phase: '全光度', phaseId: 'power', name: '模仁設計（全光度）', unit: 'CNC', role: 'CNC', owner: 'CNC 鍾民', color: 'cnc', desc: '完成全光度模仁設計；Gate 9 NG 退回此站。', checklist: ['全光度模仁設計完成', '加工條件確認', '預計完成時間已填'] },
  { id: 7, phase: '全光度', phaseId: 'power', name: '全光度 PP 模', unit: '製程', role: 'Process', owner: '製程 舜鴻', color: 'process', desc: '製作全光度 PP 模並確認成形條件。', checklist: ['PP 模完成', '焦度條件確認', '交付 RD 確認'] },
  { id: 8, phase: '全光度', phaseId: 'power', name: '全光度移印測試', unit: '研發測試', role: 'RD_Print', owner: '研發 士韋', color: 'rd-print', desc: '確認全光度移印效果與構型紀錄。', checklist: ['移印測試完成', '圖片/備註已記錄', '可安排試戴'] },
  { id: 9, phase: '全光度', phaseId: 'power', name: '全光度臨床試戴與測試', unit: '研發試戴', role: 'RD_Trial', owner: '研發 奇蓁 / 軒毅', color: 'rd-trial', desc: '執行全光度臨床試戴與判定；OK 後進量產。', checklist: ['預計試戴時間已填', '試戴結果已回填', 'OK/NG 判定完成'] },
  { id: 10, phase: '量產', phaseId: 'production', name: '量產', unit: 'PM / 量產', role: 'PM', owner: 'PM 曼聿', color: 'pm', desc: '確認量產資料、放行條件與初期追蹤。', checklist: ['量產資料確認', '主管放行', '會議紀錄完成'] }
];

const LENS_V5_TEAM = [
  { username: 'rd_zongmin', password: '123', role: 'RD', lensRole: 'RD', name: '宗旻', dept: '研發' },
  { username: 'rd_shiwei', password: '123', role: 'RD', lensRole: 'RD_Print', name: '士韋', dept: '研發' },
  { username: 'rd_qizhen', password: '123', role: 'RD', lensRole: 'RD_Trial', name: '奇蓁', dept: '研發' },
  { username: 'rd_xuanyi', password: '123', role: 'RD', lensRole: 'RD_Trial', name: '軒毅', dept: '研發' },
  { username: 'process_shunhong', password: '123', role: 'Employee', lensRole: 'Process', name: '舜鴻', dept: '製程' },
  { username: 'cnc_zhongmin', password: '123', role: 'CNC', lensRole: 'CNC', name: '鍾民', dept: 'CNC' },
  { username: 'vp_andy', password: '123', role: 'Supervisor', lensRole: 'Supervisor', name: '謝右銘 Andy', dept: '研發主管' },
  { username: 'pm_manyu', password: '123', role: 'PM', lensRole: 'PM', name: '曼聿', dept: 'PM' },
  { username: 'pm_xuanci', password: '123', role: 'PM', lensRole: 'PM', name: '瑄祠', dept: 'PM' },
  { username: 'pm_rouan', password: '123', role: 'PM', lensRole: 'PM', name: '媃安', dept: 'PM' }
];

const LENS_V5_ROLE_GROUPS = {
  CNC: ['CNC'],
  Employee: ['Process'],
  RD: ['RD', 'RD_Print', 'RD_Trial'],
  PM: ['PM'],
  Supervisor: ['Supervisor', 'VP', 'PM'],
  VP: ['Supervisor', 'VP', 'PM'],
  Admin: ['Admin', 'Supervisor', 'PM', 'CNC', 'Process', 'RD', 'RD_Print', 'RD_Trial']
};

function lensV5InitSpec() {
  patchStageDefinitionsV5();
  ensureTeamUsersV5();
  ensureProcessGuidePaneV5();
}

function patchStageDefinitionsV5() {
  LENS_V5_STAGES.forEach(stage => {
    const gateKey = String(stage.id);
    if (typeof GATE_DEFS_V4 !== 'undefined' && GATE_DEFS_V4[gateKey]) {
      Object.assign(GATE_DEFS_V4[gateKey], {
        name: stage.name,
        department: stage.unit,
        confirmRole: stage.role === 'Process' ? 'Employee' : stage.role.startsWith('RD') ? 'RD' : stage.role,
        ownerGroup: stage.role,
        description: stage.desc,
        checklist: stage.checklist,
        owner: stage.owner
      });
    }
    if (typeof GATE_STAGES !== 'undefined') {
      const old = GATE_STAGES.find(g => String(g.id) === gateKey);
      if (old) {
        old.name = stage.name;
        old.shortName = stage.name;
        old.department = stage.unit;
        old.owner = stage.owner;
        old.description = stage.desc;
        old.checklist = stage.checklist;
      }
    }
  });
}

function ensureTeamUsersV5() {
  if (!window.db || !Array.isArray(db.users)) return;
  LENS_V5_TEAM.forEach(user => {
    const existing = db.users.find(u => u.username === user.username || u.name === user.name);
    if (existing) Object.assign(existing, user);
    else db.users.push({ ...user });
  });
  const mapLegacy = [
    ['pm_user', { name: '曼聿', dept: 'PM', lensRole: 'PM' }],
    ['rd_user', { name: '士韋', dept: '研發', lensRole: 'RD_Print' }],
    ['cnc_user', { name: '鍾民', dept: 'CNC', lensRole: 'CNC' }],
    ['supervisor_user', { name: '謝右銘 Andy', dept: '研發主管', lensRole: 'Supervisor' }],
    ['vp_user', { name: '謝右銘 Andy', dept: '研發主管', lensRole: 'Supervisor' }]
  ];
  mapLegacy.forEach(([username, patch]) => {
    const user = db.users.find(u => u.username === username);
    if (user) Object.assign(user, patch);
  });
}

function ensureProcessGuidePaneV5() {
  if (document.getElementById('tab-process-guide')) return;
  const body = document.querySelector('.content-body');
  if (!body) return;
  const section = document.createElement('section');
  section.id = 'tab-process-guide';
  section.className = 'tab-pane';
  body.appendChild(section);
}

function getLensRoleV5(user = currentUser) {
  if (!user) return activePerspective || 'PM';
  if (user.lensRole) return user.lensRole;
  if (user.name && user.name.includes('鍾民')) return 'CNC';
  if (user.name && user.name.includes('舜鴻')) return 'Process';
  if (user.name && user.name.includes('士韋')) return 'RD_Print';
  if (user.name && (user.name.includes('奇蓁') || user.name.includes('軒毅'))) return 'RD_Trial';
  if (user.name && (user.name.includes('Andy') || user.name.includes('謝右銘'))) return 'Supervisor';
  return activePerspective || user.role || 'PM';
}

function isManagerRoleV5() {
  const role = getLensRoleV5();
  return ['PM', 'Supervisor', 'VP', 'Admin'].includes(role) || ['PM', 'Supervisor', 'VP', 'Admin'].includes(activePerspective);
}

function getProjectDisplayV5(project) {
  const d = getProjectDisplay(project);
  const gate = Math.max(1, Math.min(10, Number(d.gate || 1)));
  const stage = LENS_V5_STAGES[gate - 1];
  return {
    ...d,
    gate,
    stage,
    owner: getStageOwnerV5(project, gate),
    currentRole: stage.role,
    currentStageName: stage.name,
    status: d.status || '進行中',
    startDate: d.startDate || '2026-06-01',
    productionDate: project.productionDateV5 || inferProductionDateV5(project),
    currentEnteredAt: project.currentEnteredAtV5 || d.powerDate || d.planoDate || d.startDate || '2026-06-20'
  };
}

function getStageOwnerV5(project, gate) {
  const stage = LENS_V5_STAGES[Number(gate) - 1] || LENS_V5_STAGES[0];
  const assignment = project.assignmentV3 || {};
  if (stage.role === 'CNC') return assignment.cnc ? `CNC ${assignment.cnc}` : 'CNC 鍾民';
  if (stage.role === 'Process') return '製程 舜鴻';
  if (stage.role === 'RD_Print') return '研發 士韋';
  if (stage.role === 'RD_Trial') return Number(gate) === 5 ? '研發 奇蓁' : '研發 軒毅';
  if (stage.role === 'PM') return assignment.pm ? `PM ${assignment.pm}` : 'PM 曼聿';
  return stage.owner;
}

function inferProductionDateV5(project) {
  const d = getProjectDisplay(project);
  if (project.deadline && /^\d{4}-\d{2}-\d{2}$/.test(project.deadline)) {
    const base = new Date(`${project.deadline}T00:00:00`);
    base.setDate(base.getDate() + 45);
    return dateIsoV5(base);
  }
  return '2026-08-15';
}

function dateIsoV5(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function daysBetweenV5(from, to = LENS_V5_TODAY) {
  const a = new Date(`${from}T00:00:00`);
  const b = new Date(`${to}T00:00:00`);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return 0;
  return Math.floor((b - a) / 86400000);
}

function isBlockedV5(project) {
  const d = getProjectDisplayV5(project);
  return String(d.status).includes('NG') || daysBetweenV5(d.currentEnteredAt) > 3;
}

function blockedDaysV5(project) {
  const d = getProjectDisplayV5(project);
  return Math.max(0, daysBetweenV5(d.currentEnteredAt) - 3);
}

function canCurrentUserHandleProjectV5(project) {
  const d = getProjectDisplayV5(project);
  const role = getLensRoleV5();
  const groups = LENS_V5_ROLE_GROUPS[role] || [role];
  if (String(d.status).includes('NG') && ['PM', 'Supervisor', 'Admin'].includes(role)) return true;
  return groups.includes(d.currentRole);
}

function getWorkItemsV5() {
  const projects = getAllProjectsForCleanUI().map(project => ({ project, d: getProjectDisplayV5(project) }));
  const mine = projects.filter(item => canCurrentUserHandleProjectV5(item.project));
  const waiting = projects.filter(item => !canCurrentUserHandleProjectV5(item.project));
  mine.sort((a, b) => Number(isBlockedV5(b.project)) - Number(isBlockedV5(a.project)) || a.d.priority - b.d.priority);
  waiting.sort((a, b) => a.d.priority - b.d.priority);
  return { mine, waiting };
}

function setupNavigationV5() {
  setMenuItem('nav-vp-milestones', '我的工作', 'vp-milestones', true);
  setMenuItem('nav-project-master', '專案總覽', 'project-master', true);
  setMenuItem('nav-action-items', '專案進度', 'action-items', true);
  setMenuItem('nav-risks-issues', '團隊成員', 'risks-issues', true);
  setMenuItem('nav-version-history', '流程說明', 'process-guide', true);
  setMenuItem('nav-gantt-chart', '月曆甘特', 'action-items', false);
  document.querySelectorAll('.menu-item').forEach(item => {
    item.onclick = (event) => {
      event.preventDefault();
      const tab = item.dataset.tab;
      if (tab === 'project-master') currentProjectDetailId = null;
      switchTab(tab);
    };
  });
}

prepareCleanNavigation = function() {
  lensV5InitSpec();
  document.title = 'LENS PDM';
  const brand = document.querySelector('.brand-text');
  if (brand) brand.textContent = 'LENS PDM';
  const footer = document.getElementById('server-status-text');
  if (footer) footer.textContent = '前端展示資料';
  setupNavigationV5();
  updateRoleSelectLabelsV4?.();
  updateLoginHelperV5();
};

function updateLoginHelperV5() {
  const helper = document.querySelector('.login-helper');
  if (!helper) return;
  helper.innerHTML = `
    <p>測試密碼皆為 <strong>123</strong></p>
    <ul>
      <li><strong>cnc_zhongmin</strong>：CNC 鍾民</li>
      <li><strong>process_shunhong</strong>：製程 舜鴻</li>
      <li><strong>rd_shiwei</strong>：研發 士韋（移印測試）</li>
      <li><strong>rd_qizhen</strong>：研發 奇蓁（臨床試戴）</li>
      <li><strong>pm_xuanci</strong>：PM 瑄祠</li>
      <li><strong>vp_andy</strong>：主管 Andy</li>
    </ul>
  `;
}

initApp = function() {
  lensV5InitSpec();
  ensureRoleUsersV3?.();
  ensureTeamUsersV5();
  prepareCleanNavigation();
  const displayName = document.getElementById('user-display-name');
  const displayDept = document.getElementById('user-display-dept');
  if (displayName) displayName.innerText = currentUser.name || currentUser.username || '使用者';
  if (displayDept) displayDept.innerText = `${currentUser.dept || ''} · ${getLensRoleV5()}`;
  ensureNotificationBell?.();
  seedGateNotifications?.();
  applyPermissions?.();
  switchTab('vp-milestones');
};

switchTab = function(tabId) {
  ensureProcessGuidePaneV5();
  document.querySelectorAll('.menu-item').forEach(item => {
    item.classList.toggle('active', item.dataset.tab === tabId);
  });
  document.querySelectorAll('.tab-pane, .tab-content').forEach(pane => pane.classList.remove('active'));
  const targetPane = document.getElementById(`tab-${tabId}`);
  if (targetPane) targetPane.classList.add('active');
  if (tabId === 'vp-milestones') renderVPMilestones();
  else if (tabId === 'project-master') renderProjectMaster();
  else if (tabId === 'action-items') renderActionItems();
  else if (tabId === 'risks-issues') renderRisksIssues();
  else if (tabId === 'process-guide') renderProcessGuideV5();
  else if (tabId === 'admin-settings' && typeof renderAdminSettings === 'function') renderAdminSettings();
};

renderVPMilestones = function() {
  lensV5InitSpec();
  if (isManagerRoleV5()) return renderManagerOverviewV5();
  return renderActionWorkbenchV5();
};

function renderActionWorkbenchV5() {
  const container = document.getElementById('tab-vp-milestones');
  if (!container) return;
  currentProjectDetailId = null;
  const { mine, waiting } = getWorkItemsV5();
  const blocked = mine.filter(item => isBlockedV5(item.project));
  const top = mine[0];
  const name = currentUser?.name || '夥伴';
  container.innerHTML = `
    <section class="simple-page v5-workbench">
      <div class="v5-conclusion ${blocked.length ? 'danger' : ''}">
        <h1>早安，${escapeHtml(name)}，今天有 ${mine.length} 件事等你處理，其中 ${blocked.length} 件已卡住。</h1>
        <p>系統已依目前階段、逾期天數與優先順序排好。</p>
      </div>
      ${top ? renderTopActionBannerV5(top) : renderEmptyActionBannerV5()}
      <div class="v5-two-col">
        <section>
          <div class="v5-section-title"><span class="v5-dot warning"></span><h2>需要你處理</h2></div>
          <div class="v5-action-list">${mine.length ? mine.map(renderActionCardV5).join('') : renderEmptyCleanState('目前沒有需要你處理的專案')}</div>
        </section>
        <section>
          <div class="v5-section-title"><span class="v5-dot neutral"></span><h2>進行中 · 等別人回覆</h2></div>
          <div class="v5-waiting-list">${waiting.length ? waiting.map(renderWaitingRowV5).join('') : renderEmptyCleanState('沒有等待中的專案')}</div>
        </section>
      </div>
      <button class="btn btn-primary" onclick="switchTab('project-master')">查看全部專案</button>
    </section>
  `;
}

function renderTopActionBannerV5(item) {
  const blocked = isBlockedV5(item.project);
  const days = blockedDaysV5(item.project);
  const text = actionSentenceV5(item.project);
  return `
    <article class="v5-top-action ${blocked ? 'danger' : ''}">
      <div>
        <span>${blocked ? `已卡住 ${days} 天` : '現在最該做的一件事'}</span>
        <h2>${escapeHtml(text)}</h2>
        <p>目前階段：${escapeHtml(item.d.currentStageName)} ・ ${escapeHtml(item.d.owner)}</p>
      </div>
      <button class="btn btn-primary" onclick="openActionConfirmV5('${escapeAttribute(item.project.id)}')">處理這件事</button>
    </article>
  `;
}

function renderEmptyActionBannerV5() {
  return `<article class="v5-top-action"><div><span>目前沒有急件</span><h2>你目前沒有待處理事項。</h2><p>可以查看等別人回覆或全部專案。</p></div><button class="btn btn-outline" onclick="switchTab('project-master')">查看全部專案</button></article>`;
}

function renderActionCardV5(item) {
  const blocked = isBlockedV5(item.project);
  return `
    <article class="v5-action-card ${blocked ? 'danger' : ''}">
      <div>
        <span class="priority-rank">第 ${item.d.priority} 優先</span>
        <h3>${escapeHtml(item.d.name)}</h3>
        <p>目前階段：${escapeHtml(item.d.currentStageName)} ・ ${escapeHtml(item.d.owner)}</p>
        ${blocked ? `<strong class="v5-delay">卡住 ・ 延誤 ${blockedDaysV5(item.project)} 天</strong>` : ''}
      </div>
      <button class="btn btn-primary" onclick="openActionConfirmV5('${escapeAttribute(item.project.id)}')">${escapeHtml(primaryActionLabelV5(item.project))}</button>
    </article>
  `;
}

function renderWaitingRowV5(item) {
  return `
    <button class="v5-wait-row" onclick="openProjectGateCenter('${escapeAttribute(item.project.id)}')">
      <strong>${escapeHtml(item.d.name)}</strong>
      <span>目前階段 ・ 等 ${escapeHtml(item.d.owner)}</span>
      <em>${escapeHtml(item.d.currentStageName)}</em>
    </button>
  `;
}

function actionSentenceV5(project) {
  const d = getProjectDisplayV5(project);
  if (String(d.status).includes('NG')) return `${d.name} 已 NG，需要你新增下一版並退回對應 Gate`;
  return `${d.name} 輪到你處理 ${d.currentStageName}`;
}

function primaryActionLabelV5(project) {
  const d = getProjectDisplayV5(project);
  if (String(d.status).includes('NG')) return '新增下一版 / 退回 Gate';
  return d.gate === 10 ? '確認量產' : '填寫進度';
}

function getNotifyTargetsV5(project) {
  const d = getProjectDisplayV5(project);
  if (String(d.status).includes('NG')) return ['PM 瑄祠', d.owner].join('、');
  const next = LENS_V5_STAGES[d.gate] || LENS_V5_STAGES[d.gate - 1];
  return next ? next.owner : 'PM 曼聿';
}

function openActionConfirmV5(projectId) {
  const project = db.projects.find(p => p.id === projectId);
  if (!project) return;
  const d = getProjectDisplayV5(project);
  const action = String(d.status).includes('NG')
    ? `建立新版本，並退回 ${d.gate >= 9 ? 'Gate 6 模仁設計（全光度）' : 'Gate 2 模仁設計（平光）'}`
    : `暫存目前階段資料：${d.currentStageName}`;
  const ok = window.confirm(`即將執行：${action}\n\n會通知：${getNotifyTargetsV5(project)}\n\n確認後可在本次前端歷程中還原。`);
  if (!ok) return;
  executeActionV5(projectId, action);
}

function executeActionV5(projectId, actionText) {
  const project = db.projects.find(p => p.id === projectId);
  if (!project) return;
  const before = JSON.parse(JSON.stringify(project));
  const d = getProjectDisplayV5(project);
  const steps = [];
  if (String(d.status).includes('NG')) {
    const backGate = d.gate >= 9 ? 6 : 2;
    const phaseId = backGate >= 6 ? 'power' : 'plano';
    ensureGateCenterV4(project);
    const versions = getPhaseVersionsV4(project, phaseId);
    const newVersion = nextVersionNameV5(d.version);
    if (!versions.includes(newVersion)) versions.push(newVersion);
    project.cleanGateState = {
      status: '進行中',
      gate: backGate,
      version: newVersion,
      owner: getStageOwnerV5(project, backGate),
      nextAction: `退回 Gate ${backGate} ${LENS_V5_STAGES[backGate - 1].name}`,
      ngReason: '',
      resultDue: ''
    };
    project.currentEnteredAtV5 = LENS_V5_TODAY;
    steps.push(`建立新版 ${newVersion}`);
    steps.push(`狀態退回 Gate ${backGate}`);
  } else {
    project.currentEnteredAtV5 = LENS_V5_TODAY;
    steps.push(`已暫存 ${d.currentStageName} 的預計完成日 / 進度欄位`);
  }
  lensV5State.lastAction = { projectId, before, steps, notify: getNotifyTargetsV5(project), at: formatNowMinuteV2() };
  addGateNotificationV4?.(projectId, '工作台動作完成', `${actionText}；將通知 ${lensV5State.lastAction.notify}`);
  saveDatabase?.();
  renderActionDoneV5(projectId);
}

function nextVersionNameV5(version) {
  const match = String(version || 'V1').match(/V(\d+)(?:\.(\d+))?/i);
  if (!match) return 'V2';
  return `V${Number(match[1]) + 1}`;
}

function renderActionDoneV5(projectId) {
  const container = document.getElementById('tab-vp-milestones');
  const action = lensV5State.lastAction;
  const rest = getWorkItemsV5().mine.filter(item => item.project.id !== projectId);
  if (!container || !action) return;
  container.innerHTML = `
    <section class="simple-page v5-workbench">
      <div class="v5-done-banner"><h1>已完成</h1><p>這個動作已套用到前端資料，並同步到專案視圖。</p></div>
      <article class="v5-action-result">
        <h2>這次實際做了什麼</h2>
        <ul>${action.steps.map(step => `<li>${escapeHtml(step)}</li>`).join('')}<li>將通知 ${escapeHtml(action.notify)}</li></ul>
      </article>
      <article class="v5-next-box">
        <h2>接下來</h2>
        <p>這件已移到「等別人回覆」。今天剩 ${rest.length} 件等你處理。</p>
        ${rest[0] ? `<button class="btn btn-primary" onclick="openActionConfirmV5('${escapeAttribute(rest[0].project.id)}')">接著處理：${escapeHtml(rest[0].d.name)}</button>` : `<button class="btn btn-outline" onclick="renderVPMilestones()">回工作台</button>`}
        <button class="btn btn-outline" onclick="undoLastActionV5()">還原這個動作</button>
      </article>
    </section>
  `;
}

function undoLastActionV5() {
  const action = lensV5State.lastAction;
  if (!action) return;
  const idx = db.projects.findIndex(p => p.id === action.projectId);
  if (idx >= 0) db.projects[idx] = action.before;
  lensV5State.lastAction = null;
  saveDatabase?.();
  renderVPMilestones();
}

function renderManagerOverviewV5() {
  const container = document.getElementById('tab-vp-milestones');
  if (!container) return;
  currentProjectDetailId = null;
  const items = getAllProjectsForCleanUI().map(project => ({ project, d: getProjectDisplayV5(project) }));
  const blocked = items.filter(item => isBlockedV5(item.project));
  const decision = items.filter(item => String(item.d.status).includes('NG'));
  const sorted = items.sort((a, b) => Number(isBlockedV5(b.project)) - Number(isBlockedV5(a.project)) || a.d.priority - b.d.priority);
  container.innerHTML = `
    <section class="simple-page v5-manager">
      <div class="page-heading v4-heading"><p class="eyebrow">Overview</p><h1>主管 / PM 總覽</h1><p>回答：每個專案到哪了、卡在哪、目前階段在誰那。</p></div>
      <div class="simple-stat-grid v4-stat-grid">
        <article class="simple-stat-card info"><span>進行中專案</span><strong>${items.length}</strong></article>
        <article class="simple-stat-card danger"><span>卡關數</span><strong>${blocked.length}</strong></article>
        <article class="simple-stat-card warning"><span>待你決策</span><strong>${decision.length}</strong></article>
      </div>
      <div class="v5-manager-list">${sorted.map(renderManagerRowV5).join('')}</div>
    </section>
  `;
}

function renderManagerRowV5(item) {
  const blocked = isBlockedV5(item.project);
  const percent = Math.round((item.d.gate / 10) * 100);
  return `
    <button class="v5-manager-row ${blocked ? 'danger' : ''}" onclick="openProjectGateCenter('${escapeAttribute(item.project.id)}')">
      <div><strong>${escapeHtml(item.d.name)}</strong><span>${escapeHtml(item.d.spec)} / ${escapeHtml(item.d.version)}</span></div>
      <div class="v5-ten-step">${Array.from({ length: 10 }, (_, i) => `<i class="${i < item.d.gate ? 'done' : ''}"></i>`).join('')}</div>
      <div><span>目前 Gate</span><strong>Gate ${item.d.gate} ${escapeHtml(item.d.currentStageName)}</strong></div>
      <div><span>目前階段</span><strong>${escapeHtml(item.d.owner)}</strong></div>
      <div><span>預計完成日</span><strong class="${blocked ? 'v5-delay' : ''}">${escapeHtml(item.project.deadline || item.d.productionDate)}${blocked ? ` ・ 卡住 ${blockedDaysV5(item.project)} 天` : ''}</strong></div>
    </button>
  `;
}

function openProjectGateCenter(projectId) {
  if (!projectId) return;
  currentProjectDetailId = projectId;
  switchTab('project-master');
}

renderProjectGateCenter = function(projectId) {
  const container = document.getElementById('tab-project-master');
  const project = db.projects.find(p => p.id === projectId);
  if (!container || !project) return;
  ensureGateCenterV4(project);
  const d = getProjectDisplayV5(project);
  const activePhaseId = getActivePhaseV4(project);
  const activePhase = GATE_PHASES_V4.find(p => p.id === activePhaseId) || GATE_PHASES_V4[0];
  const activeVersion = getActiveVersionV4(project, activePhaseId);
  container.innerHTML = `
    <section class="simple-page v4-page gate-center-page">
      <div class="page-action-row"><button class="back-button" onclick="currentProjectDetailId=null; renderProjectMaster();">← 回專案總覽</button><button class="btn btn-outline" onclick="exportProjectMeetingExcel('${escapeAttribute(project.id)}')">匯出會議 Excel</button></div>
      <div class="project-detail-heading v4-heading"><p class="eyebrow">Project Gate Center</p><h1>${escapeHtml(d.name)}</h1></div>
      <article class="gate-summary-card v4-summary ${statusClassV4(d.status)}"><div class="summary-main"><span class="status-pill ${statusClassV4(d.status)}">${escapeHtml(d.status)}</span><h2>目前階段：Gate ${d.gate} ${escapeHtml(d.currentStageName)}</h2><p>${escapeHtml(d.ngReason || d.stage.desc)}</p></div><div class="summary-grid"><div><span>目前大項目</span><strong>${escapeHtml(d.stage.phase)}</strong></div><div><span>目前版本</span><strong>${escapeHtml(d.version)}</strong></div><div><span>下一步</span><strong>${escapeHtml(d.nextAction || `交給 ${d.owner}`)}</strong></div><div><span>目前階段在誰那</span><strong>${escapeHtml(d.owner)}</strong></div></div></article>
      <div class="phase-dashboard v4-phase-dashboard">${GATE_PHASES_V4.map(phase => renderPhaseDashboardCardV4(project, phase, getCurrentPhaseV4(project), activePhaseId)).join('')}</div>
      <div class="phase-tabs v4-phase-tabs">${GATE_PHASES_V4.map(phase => `<button class="${phase.id === activePhaseId ? 'active' : ''}" onclick="setProjectPhaseTab('${escapeAttribute(project.id)}', '${phase.id}')">${escapeHtml(phase.label)}</button>`).join('')}</div>
      <section class="phase-panel v4-phase-panel"><div class="phase-panel-head"><div><h2>${escapeHtml(activePhase.label)}</h2><p>${escapeHtml(activePhase.subtitle)}</p></div>${renderVersionTabsV4(project, activePhaseId, activeVersion)}</div><div class="horizontal-gate-list v4-gate-list">${activePhase.gateKeys.map(key => renderGateCardV5(project, key, activeVersion)).join('')}</div></section>
    </section>`;
};

function renderGateCardV5(project, gateKey, activeVersion) {
  const key = String(gateKey);
  const stage = LENS_V5_STAGES[Number(key) - 1];
  const def = GATE_DEFS_V4[key];
  if (!def || !stage) return renderGateCardV4(project, gateKey, activeVersion);
  const rec = getGateRecordV4(project, key, activeVersion);
  rec.owner = rec.owner || getStageOwnerV5(project, key);
  rec.checklistV5 = rec.checklistV5 || stage.checklist.map(text => ({ text, checked: false, checkedBy: '', checkedAt: '' }));
  const state = getGateStateV4(project, key, activeVersion);
  const safe = safeDomId(`v5-${project.id}-${key}-${activeVersion}`);
  const doneCount = rec.checklistV5.filter(item => item.checked).length;
  const allDone = doneCount === rec.checklistV5.length;
  const canEdit = canEditGateV4(def, rec);
  const canConfirm = canEdit && allDone && state !== '已完成';
  return `
    <article class="gate-row-card v5-gate-card ${statusClassV4(state)}">
      <div class="gate-row-main"><div class="gate-row-title"><span class="gate-number">Gate ${key}</span><div><h3>${escapeHtml(stage.name)}</h3><p>${escapeHtml(stage.desc)}</p></div></div><span class="status-pill ${statusClassV4(state)}">${escapeHtml(state)}</span></div>
      <div class="gate-row-fields v4-gate-fields">
        <label><span>版本</span><strong>${escapeHtml(activeVersion)}</strong></label>
        <label><span>負責單位</span><strong>${escapeHtml(stage.unit)}</strong></label>
        <label><span>負責人</span><select id="owner-${safe}" ${canEdit ? '' : 'disabled'}>${getOwnerOptionsV5(stage.role, rec.owner)}</select></label>
        <label><span>預計完成日</span><input id="due-${safe}" type="date" value="${escapeAttribute(rec.dueDate || '')}" ${canEdit ? '' : 'disabled'}></label>
      </div>
      <div class="v5-checklist">${rec.checklistV5.map((item, idx) => renderChecklistItemV5(project.id, key, activeVersion, safe, item, idx, canEdit)).join('')}</div>
      <div class="v5-check-summary">已完成 ${doneCount} / ${rec.checklistV5.length} 項</div>
      ${key === '4' || key === '8' ? renderImageRecordBlockV4(project, key, rec, safe, canEdit) : ''}
      ${key === '5' || key === '9' ? renderNgBlockV4(project, key, rec, safe, canEdit) : ''}
      <div class="gate-row-actions">
        <span>${allDone ? '所有事項已完成，可以確認 Gate' : '需完成全部 checklist 才能確認完成'}</span>
        ${canEdit ? `<button class="btn btn-outline" onclick="saveGateFieldsV5('${escapeAttribute(project.id)}', '${key}', '${escapeAttribute(activeVersion)}', '${safe}')">儲存欄位</button>` : ''}
        <button class="btn btn-primary" ${canConfirm ? '' : 'disabled'} onclick="confirmProjectGateV4('${escapeAttribute(project.id)}', '${key}', '${escapeAttribute(activeVersion)}')">確認完成</button>
      </div>
    </article>
  `;
}

function renderChecklistItemV5(projectId, gateKey, version, safe, item, idx, canEdit) {
  return `
    <label class="v5-check-item ${item.checked ? 'checked' : ''}">
      <input type="checkbox" ${item.checked ? 'checked' : ''} ${canEdit ? '' : 'disabled'} onchange="toggleGateChecklistV5('${escapeAttribute(projectId)}', '${gateKey}', '${escapeAttribute(version)}', ${idx}, this.checked)">
      <span>${escapeHtml(item.text)}</span>
      <em>${item.checked ? `${escapeHtml(item.checkedBy)} ・ ${escapeHtml(item.checkedAt)}` : '未完成'}</em>
    </label>
  `;
}

function getOwnerOptionsV5(role, selected) {
  const source = {
    CNC: ['CNC 鍾民'],
    Process: ['製程 舜鴻'],
    RD_Print: ['研發 士韋'],
    RD_Trial: ['研發 奇蓁', '研發 軒毅'],
    PM: ['PM 曼聿', 'PM 瑄祠', 'PM 媃安']
  }[role] || ['PM 曼聿'];
  const all = Array.from(new Set([selected, ...source].filter(Boolean)));
  return all.map(name => `<option value="${escapeAttribute(name)}" ${name === selected ? 'selected' : ''}>${escapeHtml(name)}</option>`).join('');
}

function toggleGateChecklistV5(projectId, gateKey, version, idx, checked) {
  const project = db.projects.find(p => p.id === projectId);
  if (!project) return;
  const rec = getGateRecordV4(project, gateKey, version);
  const stage = LENS_V5_STAGES[Number(gateKey) - 1];
  rec.checklistV5 = rec.checklistV5 || stage.checklist.map(text => ({ text, checked: false, checkedBy: '', checkedAt: '' }));
  const item = rec.checklistV5[idx];
  if (!item) return;
  item.checked = checked;
  item.checkedBy = checked ? (currentUser?.name || '使用者') : '';
  item.checkedAt = checked ? formatNowMinuteV2() : '';
  saveDatabase?.();
  renderProjectGateCenter(projectId);
}

function saveGateFieldsV5(projectId, gateKey, version, safe) {
  const project = db.projects.find(p => p.id === projectId);
  if (!project) return;
  const rec = getGateRecordV4(project, gateKey, version);
  rec.owner = getInputValue(`owner-${safe}`) || rec.owner;
  rec.dueDate = getInputValue(`due-${safe}`) || rec.dueDate;
  rec.imageLink = getInputValue(`image-link-${safe}`) || rec.imageLink;
  rec.imageNote = getInputValue(`image-note-${safe}`) || rec.imageNote;
  project.deadline = rec.dueDate || project.deadline;
  addGateNotificationV4?.(projectId, '預計完成日更新', `${LENS_V5_STAGES[Number(gateKey) - 1].name} 預計 ${rec.dueDate || '未填'} 完成`);
  saveDatabase?.();
  renderProjectGateCenter(projectId);
}

renderActionItems = function() {
  const container = document.getElementById('tab-action-items');
  if (!container) return;
  currentProjectDetailId = null;
  const view = lensV5State.progressView || 'gantt';
  container.innerHTML = `
    <section class="simple-page v5-progress">
      <div class="page-heading v4-heading"><p class="eyebrow">Progress</p><h1>專案進度</h1><p>三個視圖讀同一份專案資料：甘特圖、月曆、里程碑。</p></div>
      <div class="phase-tabs progress-tabs v4-phase-tabs">
        <button class="${view === 'gantt' ? 'active' : ''}" onclick="setProgressViewV5('gantt')">甘特圖</button>
        <button class="${view === 'calendar' ? 'active' : ''}" onclick="setProgressViewV5('calendar')">月曆</button>
        <button class="${view === 'milestone' ? 'active' : ''}" onclick="setProgressViewV5('milestone')">里程碑</button>
      </div>
      ${view === 'calendar' ? renderCalendarViewV5() : view === 'milestone' ? renderMilestoneViewV5() : renderGanttTimelineV5()}
    </section>
  `;
};

function setProgressViewV5(view) {
  lensV5State.progressView = view;
  renderActionItems();
}

function setGanttScaleV5(scale) {
  lensV5State.ganttScale = scale;
  renderActionItems();
}

function renderGanttTimelineV5() {
  const projects = getAllProjectsForCleanUI().map(p => ({ project: p, d: getProjectDisplayV5(p) }));
  const minDate = lensV5State.ganttScale === 'week' ? '2026-06-01' : '2025-11-01';
  const maxDate = lensV5State.ganttScale === 'week' ? '2026-07-15' : '2026-09-01';
  const todayPct = timelinePctV5(LENS_V5_TODAY, minDate, maxDate);
  return `
    <div class="v5-gantt-card">
      <div class="v5-gantt-toolbar"><strong>時間軸</strong><div><button class="${lensV5State.ganttScale === 'month' ? 'active' : ''}" onclick="setGanttScaleV5('month')">月</button><button class="${lensV5State.ganttScale === 'week' ? 'active' : ''}" onclick="setGanttScaleV5('week')">週</button></div></div>
      <div class="v5-gantt-scale">${renderGanttTicksV5(minDate, maxDate)}</div>
      <div class="v5-gantt-body">
        <div class="v5-today-line" style="left:${todayPct}%"><span>今天</span></div>
        ${projects.map(item => renderGanttRowV5(item, minDate, maxDate)).join('')}
      </div>
    </div>
  `;
}

function renderGanttTicksV5(minDate, maxDate) {
  const start = new Date(`${minDate}T00:00:00`);
  const end = new Date(`${maxDate}T00:00:00`);
  const ticks = [];
  const step = lensV5State.ganttScale === 'week' ? 7 : 30;
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + step)) {
    ticks.push(`<span style="left:${timelinePctV5(dateIsoV5(d), minDate, maxDate)}%">${d.getMonth() + 1}/${d.getDate()}</span>`);
  }
  return ticks.join('');
}

function renderGanttRowV5(item, minDate, maxDate) {
  const left = timelinePctV5(item.d.startDate, minDate, maxDate);
  const right = timelinePctV5(item.d.productionDate, minDate, maxDate);
  const width = Math.max(10, right - left);
  const progress = Math.max(0, Math.min(100, (item.d.gate - 1) / 9 * 100));
  const currentWidth = Math.min(16, 100 - progress);
  const blocked = isBlockedV5(item.project);
  return `
    <div class="v5-gantt-row ${blocked ? 'danger' : ''}">
      <div class="v5-gantt-left"><strong>${escapeHtml(item.d.spec)}</strong><span>${escapeHtml(item.d.version)} / ${escapeHtml(item.d.owner)}</span></div>
      <div class="v5-gantt-track">
        <div class="v5-gantt-bar ${blocked ? 'danger' : ''}" style="left:${left}%;width:${width}%">
          <span class="done" style="width:${progress}%"></span>
          <span class="current" style="left:${progress}%;width:${currentWidth}%"></span>
          <em>Gate ${item.d.gate} ${escapeHtml(item.d.currentStageName)} ・ ${escapeHtml(item.d.owner)}${blocked ? `｜卡關 ・ 延誤 ${blockedDaysV5(item.project)} 天` : ''}</em>
        </div>
      </div>
    </div>
  `;
}

function timelinePctV5(date, minDate, maxDate) {
  const min = new Date(`${minDate}T00:00:00`).getTime();
  const max = new Date(`${maxDate}T00:00:00`).getTime();
  const val = new Date(`${date}T00:00:00`).getTime();
  if (Number.isNaN(val) || max === min) return 0;
  return Math.max(0, Math.min(100, ((val - min) / (max - min)) * 100));
}

function buildProjectEventsV5() {
  const events = [];
  getAllProjectsForCleanUI().forEach(project => {
    const d = getProjectDisplayV5(project);
    events.push({ date: project.deadline || d.currentEnteredAt, project, d, label: `${d.spec} ${d.version}｜${d.currentStageName}｜${d.owner}`, status: d.status });
    ensureGateCenterV4(project);
    Object.values(project.gateRecordsV4 || {}).forEach(versionMap => {
      Object.values(versionMap || {}).forEach(gateMap => {
        Object.values(gateMap || {}).forEach(rec => {
          if (rec.dueDate) {
            const stage = LENS_V5_STAGES[Number(rec.gateKey) - 1];
            if (stage) events.push({ date: rec.dueDate, project, d, label: `${d.spec} ${rec.version}｜${stage.name}｜${rec.owner}`, status: rec.status || '進行中' });
          }
        });
      });
    });
  });
  return events.filter(e => /^\d{4}-\d{2}-\d{2}$/.test(e.date || ''));
}

function renderCalendarViewV5() {
  const base = new Date(`${lensV5State.calendarDate}T00:00:00`);
  const y = base.getFullYear();
  const m = base.getMonth();
  const days = makeCalendarDaysV5(y, m);
  return `
    <div class="v5-calendar-card">
      <div class="v5-calendar-head"><button onclick="moveCalendarV5(-1)">‹ 上個月</button><h2>${y} 年 ${m + 1} 月</h2><button onclick="moveCalendarV5(1)">下個月 ›</button><button onclick="todayCalendarV5()">今天</button></div>
      <div class="calendar-weekdays-v4">${['日','一','二','三','四','五','六'].map(d => `<span>${d}</span>`).join('')}</div>
      <div class="calendar-grid-v4">${days.map(renderCalendarDayCellV5).join('')}</div>
      ${renderSelectedDayDetailV5()}
    </div>
  `;
}

function makeCalendarDaysV5(year, month) {
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - first.getDay());
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return { iso: dateIsoV5(d), day: d.getDate(), inMonth: d.getMonth() === month };
  });
}

function renderCalendarDayCellV5(day) {
  const events = buildProjectEventsV5().filter(e => e.date === day.iso);
  return `
    <button class="calendar-day-v4 v5-cal-day ${day.inMonth ? '' : 'muted'} ${day.iso === LENS_V5_TODAY ? 'today' : ''}" onclick="selectCalendarDayV5('${day.iso}')">
      <span class="day-num">${day.day}</span>
      <div class="day-events-v4">${events.slice(0, 3).map(e => `<span class="calendar-event-v4 ${statusClassV4(e.status)}">${escapeHtml(e.label)}</span>`).join('')}${events.length > 3 ? `<small>+${events.length - 3}</small>` : ''}</div>
    </button>
  `;
}

function moveCalendarV5(delta) {
  const d = new Date(`${lensV5State.calendarDate}T00:00:00`);
  d.setMonth(d.getMonth() + delta);
  lensV5State.calendarDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
  renderActionItems();
}

function todayCalendarV5() {
  lensV5State.calendarDate = LENS_V5_TODAY.slice(0, 8) + '01';
  lensV5State.selectedCalendarDay = LENS_V5_TODAY;
  renderActionItems();
}

function selectCalendarDayV5(day) {
  lensV5State.selectedCalendarDay = day;
  renderActionItems();
}

function renderSelectedDayDetailV5() {
  const events = buildProjectEventsV5().filter(e => e.date === lensV5State.selectedCalendarDay);
  return `
    <div class="v5-day-detail"><h3>${escapeHtml(lensV5State.selectedCalendarDay)} 事件</h3>${events.length ? events.map(e => `<button onclick="openProjectGateCenter('${escapeAttribute(e.project.id)}')"><strong>${escapeHtml(e.d.name)}</strong><span>目前 Gate ${e.d.gate} ${escapeHtml(e.d.currentStageName)}｜${escapeHtml(e.d.owner)}｜${escapeHtml(e.status)}</span><em>${escapeHtml(e.d.nextAction || '等待下一階段')}</em></button>`).join('') : '<p>這天沒有事件。</p>'}</div>
  `;
}

function renderMilestoneViewV5() {
  const projects = getAllProjectsForCleanUI();
  return `<div class="v5-milestone-list">${projects.map(renderProjectMilestoneV5).join('')}</div>`;
}

function renderProjectMilestoneV5(project) {
  const d = getProjectDisplayV5(project);
  return `
    <article class="v5-milestone-card">
      <h3>${escapeHtml(d.name)} <span>${escapeHtml(d.version)}</span></h3>
      <div class="v5-milestone-steps">${LENS_V5_STAGES.map(stage => {
        const rec = getGateRecordV4(project, String(stage.id), getActiveVersionV4(project, stage.phaseId === 'demand' ? 'demand' : stage.phaseId === 'production' ? 'production' : stage.phaseId));
        const done = stage.id < d.gate || rec.status === '已完成';
        const current = stage.id === d.gate;
        const total = rec.checklistV5?.length || stage.checklist.length;
        const checked = rec.checklistV5?.filter(i => i.checked).length || 0;
        return `<div class="${done ? 'done' : current ? 'current' : ''}"><i>${done ? '✓' : current ? '!' : ''}</i><strong>Gate ${stage.id} ${escapeHtml(stage.name)}</strong><span>${escapeHtml(rec.confirmedBy || stage.owner)} ${rec.confirmedAt ? `・ ${escapeHtml(rec.confirmedAt)}` : ''}</span><em>${checked} / ${total} 項完成</em></div>`;
      }).join('')}</div>
    </article>
  `;
}

renderRisksIssues = function() {
  const container = document.getElementById('tab-risks-issues');
  if (!container) return;
  currentProjectDetailId = null;
  const groups = [
    ['研發', ['宗旻', '士韋', '奇蓁', '軒毅']],
    ['製程', ['舜鴻']],
    ['研發主管', ['謝右銘 Andy（副總）']],
    ['CNC', ['鍾民']],
    ['PM', ['曼聿', '瑄祠', '媃安']]
  ];
  container.innerHTML = `<section class="simple-page v4-page team-page-v2"><div class="page-heading v4-heading"><p class="eyebrow">Team</p><h1>團隊成員</h1><p>更新為文字檔指定名單，作為 owner 下拉與工作台角色判斷來源。</p></div><div class="team-dept-grid-v2 v4-team-grid">${groups.map(([dept, members]) => `<article class="team-dept-card-v2 v4-team-card"><div class="team-dept-head"><div><h2>${escapeHtml(dept)}</h2><p>${dept === '研發主管' ? '簽核權限 / 主管視角' : '部門成員'}</p></div></div><div class="member-list-v4">${members.map(m => `<div class="member-row-v4"><strong>${escapeHtml(m)}</strong><span>${escapeHtml(dept)}</span><em>分機待補</em></div>`).join('')}</div></article>`).join('')}</div></section>`;
};

function renderProcessGuideV5() {
  const container = document.getElementById('tab-process-guide');
  if (!container) return;
  container.innerHTML = `
    <section class="simple-page v5-guide">
      <div class="page-heading v4-heading"><p class="eyebrow">Process Guide</p><h1>流程說明</h1><p>給其他單位快速理解 10 Gate 流程：一直線、不折彎。</p></div>
      <div class="v5-route">${LENS_V5_STAGES.map((stage, idx) => `${idx === 1 ? '<div class="v5-route-divider">▼ 平光這一輪</div>' : ''}${idx === 5 ? '<div class="v5-route-divider">▼ 全光度這一輪</div>' : ''}<div class="v5-route-station"><i class="${stage.color}">${stage.id}</i><div><strong>${escapeHtml(stage.name)}</strong><span>${escapeHtml(stage.owner)}｜${escapeHtml(stage.unit)}</span><p>${escapeHtml(stage.desc)}</p></div></div>`).join('')}</div>
      <div class="v5-guide-rule">每站規矩：輪到你 → 收通知 → 押預計完成日存檔 → 按確認完成 → 系統自動通知下一站。</div>
      <div class="v5-legend"><span><i class="cnc"></i>CNC</span><span><i class="process"></i>製程</span><span><i class="rd-print"></i>研發測試</span><span><i class="rd-trial"></i>研發試戴</span><span><i class="pm"></i>PM/量產</span></div>
    </section>
  `;
}

const originalExportDataJSONV5 = typeof exportDataJSON === 'function' ? exportDataJSON : null;
exportDataJSON = function() {
  if (originalExportDataJSONV5) return originalExportDataJSONV5();
  const blob = new Blob([JSON.stringify(db, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'lens-pdm-database.json';
  a.click();
  URL.revokeObjectURL(a.href);
};

lensV5InitSpec();

document.addEventListener('DOMContentLoaded', () => {
  lensV5InitSpec();
  setupNavigationV5();
});
