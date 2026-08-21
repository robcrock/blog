/**
 * One-shot importer: creates Primitives + Semantic variable collections
 * with Light/Dark modes from the extracted robcrock.com design tokens.
 *
 * Run: Plugins → Development → Import from manifest → this folder → Run
 */
/* GENERATED — do not hand-edit; regenerate via scripts/ds-extract */

var TOKENS = [
  {
    "path": "primitives/duration/hover",
    "type": "dimension",
    "value": "200ms",
    "modes": {},
    "description": "Hover transitions for color/background/opacity"
  },
  {
    "path": "primitives/ease/out/cubic",
    "type": "string",
    "value": "cubic-bezier(0.215, 0.61, 0.355, 1)",
    "modes": {},
    "description": "ease-out-cubic — fade-in-up keyframe"
  },
  {
    "path": "primitives/ease/out/quad",
    "type": "string",
    "value": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    "modes": {},
    "description": "ease-out-quad — entering/exiting (CLAUDE.md)"
  },
  {
    "path": "primitives/ease/out/quart",
    "type": "string",
    "value": "cubic-bezier(0.165, 0.84, 0.44, 1)",
    "modes": {
      "Dark": "cubic-bezier(0.165, 0.84, 0.44, 1)"
    },
    "description": ""
  },
  {
    "path": "primitives/radius",
    "type": "dimension",
    "value": "0.25rem",
    "modes": {
      "Dark": "0.25rem"
    },
    "description": ""
  },
  {
    "path": "primitives/tighter",
    "type": "dimension",
    "value": "-0.02em",
    "modes": {
      "Dark": "-0.02em"
    },
    "description": ""
  },
  {
    "path": "primitives/tightest",
    "type": "dimension",
    "value": "-0.025em",
    "modes": {
      "Dark": "-0.025em"
    },
    "description": ""
  },
  {
    "path": "semantic/accent",
    "type": "color",
    "value": "#cb5343",
    "modes": {
      "Dark": "#eb5847"
    },
    "description": ""
  },
  {
    "path": "semantic/accent/foreground",
    "type": "color",
    "value": "#ffffff",
    "modes": {
      "Dark": "#ffffff"
    },
    "description": ""
  },
  {
    "path": "semantic/background",
    "type": "color",
    "value": "#fafafa",
    "modes": {
      "Dark": "#141414"
    },
    "description": ""
  },
  {
    "path": "semantic/border",
    "type": "color",
    "value": "#ebebeb",
    "modes": {
      "Dark": "#333333"
    },
    "description": ""
  },
  {
    "path": "semantic/brand/primary",
    "type": "color",
    "value": "#CB5142",
    "modes": {
      "Dark": "#E85545"
    },
    "description": "Signature brand red (source of truth). Site forces light theme; dark mode tokens exist but ThemeProvider uses forcedTheme=light."
  },
  {
    "path": "semantic/card",
    "type": "color",
    "value": "#ffffff",
    "modes": {
      "Dark": "#1f1f1f"
    },
    "description": ""
  },
  {
    "path": "semantic/card/foreground",
    "type": "color",
    "value": "#1a1a1a",
    "modes": {
      "Dark": "#f2f2f2"
    },
    "description": ""
  },
  {
    "path": "semantic/destructive",
    "type": "color",
    "value": "#dc2828",
    "modes": {
      "Dark": "#e23636"
    },
    "description": ""
  },
  {
    "path": "semantic/destructive/foreground",
    "type": "color",
    "value": "#ffffff",
    "modes": {
      "Dark": "#ffffff"
    },
    "description": ""
  },
  {
    "path": "semantic/foreground",
    "type": "color",
    "value": "#1a1a1a",
    "modes": {
      "Dark": "#f2f2f2"
    },
    "description": ""
  },
  {
    "path": "semantic/input",
    "type": "color",
    "value": "#ebebeb",
    "modes": {
      "Dark": "#333333"
    },
    "description": ""
  },
  {
    "path": "semantic/muted",
    "type": "color",
    "value": "#f5f5f5",
    "modes": {
      "Dark": "#2e2e2e"
    },
    "description": ""
  },
  {
    "path": "semantic/muted/foreground",
    "type": "color",
    "value": "#737373",
    "modes": {
      "Dark": "#999999"
    },
    "description": ""
  },
  {
    "path": "semantic/popover",
    "type": "color",
    "value": "#ffffff",
    "modes": {
      "Dark": "#1f1f1f"
    },
    "description": ""
  },
  {
    "path": "semantic/popover/foreground",
    "type": "color",
    "value": "#1a1a1a",
    "modes": {
      "Dark": "#f2f2f2"
    },
    "description": ""
  },
  {
    "path": "semantic/primary",
    "type": "color",
    "value": "#cb5343",
    "modes": {
      "Dark": "#eb5847"
    },
    "description": ""
  },
  {
    "path": "semantic/primary/foreground",
    "type": "color",
    "value": "#ffffff",
    "modes": {
      "Dark": "#ffffff"
    },
    "description": ""
  },
  {
    "path": "semantic/ring",
    "type": "color",
    "value": "#cb5343",
    "modes": {
      "Dark": "#eb5847"
    },
    "description": ""
  },
  {
    "path": "semantic/secondary",
    "type": "color",
    "value": "#f5f5f5",
    "modes": {
      "Dark": "#2e2e2e"
    },
    "description": ""
  },
  {
    "path": "semantic/secondary/foreground",
    "type": "color",
    "value": "#1a1a1a",
    "modes": {
      "Dark": "#f2f2f2"
    },
    "description": ""
  },
  {
    "path": "semantic/typography/body",
    "type": "string",
    "value": "text-base text-muted-foreground",
    "modes": {},
    "description": "Default supporting body"
  },
  {
    "path": "semantic/typography/hero",
    "type": "string",
    "value": "font-bold tracking-tighter text-5xl xl:text-[84px]",
    "modes": {},
    "description": "Home hero headline recipe"
  },
  {
    "path": "semantic/typography/meta",
    "type": "string",
    "value": "font-mono text-[11px] uppercase tracking-wide",
    "modes": {},
    "description": "Meta / eyebrow labels"
  },
  {
    "path": "semantic/typography/page-title",
    "type": "string",
    "value": "font-bold tracking-tighter text-4xl md:text-5xl lg:text-6xl",
    "modes": {},
    "description": "Page H1 recipe"
  },
  {
    "path": "semantic/typography/section-label",
    "type": "string",
    "value": "text-lg",
    "modes": {},
    "description": "Section label (e.g. LAB)"
  }
];

function hexToRgb(hex) {
  var h = String(hex).replace('#', '');
  if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
  if (h.length !== 6) return null;
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
  };
}

function parseDimension(value) {
  if (typeof value === 'number') return value;
  var s = String(value).trim();
  var m = s.match(/^(-?[\d.]+)(px|rem|em|ms|s|%)?$/i);
  if (!m) return null;
  var n = parseFloat(m[1]);
  var unit = (m[2] || 'px').toLowerCase();
  if (unit === 'rem' || unit === 'em') return n * 16;
  if (unit === 'ms') return n;
  if (unit === 's') return n * 1000;
  if (unit === '%') return n;
  return n;
}

function figmaType(t) {
  if (t === 'color') return 'COLOR';
  if (t === 'dimension' || t === 'number') return 'FLOAT';
  if (t === 'boolean') return 'BOOLEAN';
  return 'STRING';
}

function toValue(token, raw) {
  if (token.type === 'color') {
    if (typeof raw === 'string' && raw.startsWith('#')) {
      var rgb = hexToRgb(raw);
      if (!rgb) return null;
      return { r: rgb.r, g: rgb.g, b: rgb.b, a: 1 };
    }
    return null;
  }
  if (token.type === 'dimension' || token.type === 'number') {
    var n = typeof raw === 'number' ? raw : parseDimension(raw);
    return n;
  }
  if (token.type === 'boolean') return Boolean(raw);
  return String(raw);
}

async function ensureCollection(name, modesNeeded) {
  var existing = await figma.variables.getLocalVariableCollectionsAsync();
  for (var i = 0; i < existing.length; i++) {
    if (existing[i].name === name) return existing[i];
  }
  var collection = figma.variables.createVariableCollection(name);
  // First mode is created as "Mode 1" — rename to Light
  var lightId = collection.modes[0].modeId;
  collection.renameMode(lightId, 'Light');
  if (modesNeeded.indexOf('Dark') !== -1) {
    collection.addMode('Dark');
  }
  return collection;
}

function modeIdByName(collection, name) {
  for (var i = 0; i < collection.modes.length; i++) {
    if (collection.modes[i].name === name) return collection.modes[i].modeId;
  }
  return collection.modes[0].modeId;
}

async function run() {
  var created = 0;
  var skipped = 0;
  var errors = [];

  var byCollection = { Primitives: [], Semantic: [] };
  for (var i = 0; i < TOKENS.length; i++) {
    var t = TOKENS[i];
    var top = t.path.split('/')[0];
    var name = t.path.split('/').slice(1).join('/');
    if (!name) name = t.path;
    // Skip typography recipe strings and easing strings that aren't useful as Figma vars
    if (t.type === 'string' && (t.path.indexOf('typography/') !== -1 || t.path.indexOf('ease/') !== -1)) {
      skipped++;
      continue;
    }
    var bucket = top === 'primitives' ? 'Primitives' : 'Semantic';
    byCollection[bucket].push({ token: t, name: name });
  }

  var collectionNames = Object.keys(byCollection);
  for (var c = 0; c < collectionNames.length; c++) {
    var cName = collectionNames[c];
    var items = byCollection[cName];
    if (!items.length) continue;
    var collection = await ensureCollection(cName, ['Light', 'Dark']);
    var lightId = modeIdByName(collection, 'Light');
    var darkId = modeIdByName(collection, 'Dark');

    var existingVars = await figma.variables.getLocalVariablesAsync();
    var existingByName = {};
    for (var e = 0; e < existingVars.length; e++) {
      if (existingVars[e].variableCollectionId === collection.id) {
        existingByName[existingVars[e].name] = existingVars[e];
      }
    }

    for (var j = 0; j < items.length; j++) {
      var item = items[j];
      var token = item.token;
      var varName = item.name.replace(/\/@$/, '').replace(/\/@\//g, '/');
      try {
        var fType = figmaType(token.type);
        var lightVal = toValue(token, token.value);
        if (lightVal === null || lightVal === undefined) {
          skipped++;
          continue;
        }
        var darkRaw = token.modes && token.modes.Dark !== undefined ? token.modes.Dark : token.value;
        var darkVal = toValue(token, darkRaw);
        if (darkVal === null || darkVal === undefined) darkVal = lightVal;

        var variable = existingByName[varName];
        if (!variable) {
          variable = figma.variables.createVariable(varName, collection, fType);
        }
        variable.setValueForMode(lightId, lightVal);
        variable.setValueForMode(darkId, darkVal);
        if (token.description) variable.description = token.description;
        created++;
      } catch (err) {
        errors.push(varName + ': ' + (err && err.message ? err.message : String(err)));
      }
    }
  }

  figma.notify('Imported ' + created + ' variables (' + skipped + ' skipped)' + (errors.length ? '; ' + errors.length + ' errors' : ''));
  console.log('[robcrock DS import]', { created: created, skipped: skipped, errors: errors });
  figma.closePlugin();
}

run();
