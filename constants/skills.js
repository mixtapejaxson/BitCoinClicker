import { defaultSkillValues } from "./defaultValues.js";

function createSkills() {
  const upgradesContainer = document.getElementById('upgrades-container');
  const template = document.getElementById('upgrade-template');

  if (!upgradesContainer || !template) {
    console.error('Required elements not found in the DOM');
    return;
  }

  const templateContent = template.textContent;
  const fragment = document.createDocumentFragment();

  defaultSkillValues.forEach((obj) => {
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

  defaultSkillValues.forEach((skill) => {
    console.log(`Querying for skill: ${skill.name}`);
    skill.cost = document.querySelector(`${skill.name}-cost`);
    skill.parsedCost = parseFloat(skill.parsedCost);
    skill.level = document.querySelector(`${skill.name}-level`);
    console.log(`Skill: ${skill.name}, Cost: ${skill.parsedCost}, Level: ${skill.level}`);
  });
}

createSkills();