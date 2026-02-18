const fs = require('fs');
const thumbsConst = fs.readFileSync('_filter_thumbs_temp.js', 'utf8');
let wb = fs.readFileSync('wordpress-plugin/flexframe-v41/workout-builder/workout-builder.js', 'utf8');

// 1. Remove MUSCLE_ICONS and EQUIP_ICONS lines
wb = wb.replace(/    const MUSCLE_ICONS = \{[^}]+\};\n/, '');
wb = wb.replace(/    const EQUIP_ICONS = \{[^}]+\};\n/, '');

// 2. Insert FILTER_THUMBNAILS and getFilterThumbnailKey after EQUIPMENT line
const equipLine = "const EQUIPMENT = ['Barbell','Dumbbell','Cables','Machines','Kettlebell','Body Weight'];";
const helperFunc = `
    function getFilterThumbnailKey(filterName) {
        const mapping = { 'hamstrings': 'hamstring', 'body weight': 'bodyweight', 'machines': 'machine' };
        const lowerName = filterName.toLowerCase();
        return mapping[lowerName] || lowerName;
    }
`;
const insertAfterEquip = equipLine + '\n' + thumbsConst + '\n' + helperFunc;
wb = wb.replace(equipLine, insertAfterEquip);

// 3. Replace buildFilterSection function
const oldBuildPattern = /    function buildFilterSection\(container, items, filterType\) \{[\s\S]*?container\.appendChild\(card\);\s*\}\);\s*\}/;

const newBuild = `    function buildFilterSection(container, items, filterType) {
        container.innerHTML = '';
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'ffwb-filter-card';
            card.dataset.value = item;
            card.dataset.filterType = filterType;

            if (filterType === 'type') {
                // Type filters are text-only (matching 3D viewer)
                const icon = item === 'Strength' ? '🏋️' : '🏃';
                card.innerHTML = \`<span class="ffwb-filter-icon">\${icon}</span><span class="ffwb-filter-label">\${item}</span>\`;
            } else {
                // Muscle & equipment filters use image thumbnails
                const thumbnailKey = getFilterThumbnailKey(item);
                const thumbSrc = FILTER_THUMBNAILS[thumbnailKey];
                if (thumbSrc) {
                    const img = document.createElement('img');
                    img.src = thumbSrc;
                    img.alt = item;
                    img.className = 'ffwb-filter-thumb-img';
                    img.draggable = false;
                    card.appendChild(img);
                }
                const label = document.createElement('span');
                label.className = 'ffwb-filter-label';
                label.textContent = item;
                card.appendChild(label);
            }

            card.addEventListener('click', () => {
                handleFilterClick(card, item, filterType, container);
            });

            container.appendChild(card);
        });
    }`;

const match = wb.match(oldBuildPattern);
if (match) {
    wb = wb.replace(match[0], newBuild);
    console.log('buildFilterSection replaced successfully');
} else {
    console.log('ERROR: Could not find buildFilterSection to replace');
}

fs.writeFileSync('wordpress-plugin/flexframe-v41/workout-builder/workout-builder.js', wb);
console.log('workout-builder.js updated successfully');
console.log('File size: ' + wb.length + ' chars');
