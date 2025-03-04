import { defaultArtifactValues } from "./defaultValues.js";

function createArtifacts() {
  const upgradesContainer = document.getElementById('upgrades-container');
  const template = document.getElementById('upgrade-template');

  if (!upgradesContainer || !template) {
    console.error('Required elements not found in the DOM');
    return;
  }

  const templateContent = template.textContent;
  const fragment = document.createDocumentFragment();

  defaultArtifactValues.forEach((obj) => {
    let html = templateContent;

    Object.keys(obj).forEach((key) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      html = html.replace(regex, obj[key]);
    });

    const div = document.createElement('div');
    div.innerHTML = html;
    fragment.appendChild(div.firstElementChild);
  });

  upgradesContainer.appendChild(fragment);
}

createArtifacts();

export const artifacts = defaultArtifactValues.map(artifact => ({
    ...artifact,
    cost: document.querySelector(`.${artifact.name}-cost`),
    parsedCost: parseFloat(document.querySelector(`.${artifact.name}-cost`).innerHTML),
    increase: document.querySelector(`.${artifact.name}-increase`),
    parsedIncrease: parseFloat(document.querySelector(`.${artifact.name}-increase`).innerHTML),
    level: document.querySelector(`.${artifact.name}-level`),
}));