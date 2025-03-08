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

defaultArtifactValues.forEach((artifact) => {
    console.log(`Querying for artifact: ${artifact.name}`);
    artifact.cost = document.querySelector(`${artifact.name}-cost`);
    artifact.parsedCost = parseFloat(artifact.parsedCost);
    artifact.level = document.querySelector(`${artifact.name}-level`);
    console.log(`Artifact: ${artifact.name}, Cost: ${artifact.parsedCost}, Level: ${artifact.level}`);
  });
}

createArtifacts();