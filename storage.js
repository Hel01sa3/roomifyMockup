var Storage = {};
Storage.KEYS = {
  SALAS: "roomify_salas",
  MATERIAS: "roomify_materias",
  TAREFAS: "roomify_tarefas",
  USUARIOS: "roomify_usuarios",
  SESSAO: "roomify_sessao",
};
Storage.set = function (key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error("Erro ao salvar:", e);
    return false;
  }
};
Storage.get = function (key, defaultValue) {
  try {
    var raw = localStorage.getItem(key);

    if (!raw || raw === "undefined") {
      return defaultValue || null;
    }

    return JSON.parse(raw);
  } catch (e) {
    console.error("Erro ao ler:", e);
    return defaultValue || null;
  }
};
Storage.remove = function (key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error("Erro ao remover:", e);
  }
};
Storage.generateId = function () {
  return (
    Date.now().toString(36) +
    "_" +
    Math.floor(Math.random() * 999999).toString(36)
  );
};
