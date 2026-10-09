const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const code = fs.readFileSync(path.join(root, "linus-easter-egg.js"), "utf8");
const linus = { providerData: [{ providerId: "github.com", uid: "192517056" }] };
function setup(storage = new Map(), blocked = false) {
  const nodes = new Map();
  const timers = new Map();
  let serial = 0;
  let listener;
  function node(id) {
    if (!nodes.has(id)) nodes.set(id, {
      hidden: true, open: false, textContent: "", events: {},
      addEventListener(type, fn) { this.events[type] = fn; },
      showModal() { this.open = true; },
      close() { this.open = false; this.events.close?.(); },
      focus() { this.focused = true; }
    });
    return nodes.get(id);
  }
  vm.runInNewContext(code, {
    document: { getElementById: node },
    window: { addEventListener() {}, quizCloud: { onAuthChange(fn) { listener = fn; fn(null); } } },
    localStorage: {
      getItem(key) { if (blocked) throw Error("blocked"); return storage.get(key); },
      setItem(key, value) { if (blocked) throw Error("blocked"); storage.set(key, value); }
    },
    setTimeout(fn) { timers.set(++serial, fn); return serial; },
    clearTimeout(id) { timers.delete(id); }
  });
  return { node, auth: user => listener(user), tick() { for (const fn of timers.values()) fn(); timers.clear(); }, timers };
}

const progress = new Map([["quiz-dashboard-v1", "existing quiz progress"], ["lerncoach-progress", "existing coach progress"]]);
const h = setup(progress);
assert.equal(h.node("linusEggBtn").hidden, true);
for (const user of [
  { displayName: "linusscodingg", uid: "192517056", providerData: [] },
  { providerData: [{ providerId: "google.com", uid: "192517056" }] },
  { providerData: [{ providerId: "github.com", uid: "123" }] }
]) {
  h.auth(user);
  assert.equal(h.node("linusEggBtn").hidden, true, "Other users must never see the trigger");
  assert.equal(h.node("linusEggDialog").open, false);
}
h.auth(linus);
assert.equal(h.node("linusEggDialog").open, true);
assert.equal(h.node("linusEggLawyer").hidden, true);
h.tick();
assert.match(h.node("linusEggMessage").textContent, /GOAT/);
assert.equal(h.node("linusEggLawyer").hidden, false);
h.node("linusEggLawyer").events.click();
assert.match(h.node("linusEggMessage").textContent, /Anwalt hat ebenfalls/);
h.node("linusEggClose").events.click();
h.auth(linus);
assert.equal(h.node("linusEggDialog").open, false, "No repeated automatic popup");
const reload = setup(progress);
reload.auth(linus);
assert.equal(reload.node("linusEggDialog").open, false, "Seen preference survives reload");
reload.node("linusEggBtn").events.click();
assert.equal(reload.node("linusEggDialog").open, true, "Manual replay remains available");
reload.auth(null);
assert.equal(reload.node("linusEggDialog").open, false);
assert.equal(reload.node("linusEggBtn").hidden, true);
assert.equal(reload.timers.size, 0, "Account change cancels pending animation");
assert.equal(progress.get("quiz-dashboard-v1"), "existing quiz progress");
assert.equal(progress.get("lerncoach-progress"), "existing coach progress");
assert.equal(progress.size, 3, "Only a separate seen preference is written");
const blocked = setup(new Map(), true);
blocked.auth(linus);
blocked.node("linusEggClose").events.click();
assert.equal(blocked.timers.size, 0, "Early close cancels timer");
blocked.auth(linus);
assert.equal(blocked.node("linusEggDialog").open, false, "Storage failure does not repeat popup during session");
console.log("Linus Easter Egg: identity isolation, replay, dismissal and progress preservation passed");
