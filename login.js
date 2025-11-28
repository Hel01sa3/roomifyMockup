var Auth = {};
Auth.getDefaultUsers = function () {
  return [
    {
      id: 1,
      nome: "Emeli (Admin)",
      email: "emeli.admin@email.com",
      senha: "admin123",
      role: "admin",
    },
    {
      id: 2,
      nome: "Carlos Pereira",
      email: "carlos.coord@email.com",
      senha: "coord123",
      role: "coordenador",
    },
    {
      id: 3,
      nome: "Ana Souza",
      email: "ana.secretaria@email.com",
      senha: "oper123",
      role: "operador",
    },
  ];
};
Auth.init = function () {
  if (!localStorage.getItem(Storage.KEYS.USUARIOS)) {
    Storage.set(Storage.KEYS.USUARIOS, this.getDefaultUsers());
  }
};
Auth.getUsers = function () {
  return Storage.get(Storage.KEYS.USUARIOS, this.getDefaultUsers());
};
Auth.login = function (email, senha) {
  if (!email || !senha) {
    return { success: false, error: "Preencha todos os campos." };
  }

  var users = this.getUsers();
  var user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return { success: false, error: "Email não encontrado." };
  }

  if (user.senha !== senha) {
    return { success: false, error: "Senha incorreta." };
  }

  var sessao = {
    userId: user.id,
    nome: user.nome,
    email: user.email,
    role: user.role,
    loginAt: new Date().toISOString(),
  };

  Storage.set(Storage.KEYS.SESSAO, sessao);

  return { success: true, user: sessao };
};
Auth.logout = function () {
  Storage.remove(Storage.KEYS.SESSAO);
  window.location.href = "login.html";
};
Auth.isLoggedIn = function () {
  return Storage.get(Storage.KEYS.SESSAO) !== null;
};
Auth.getCurrentUser = function () {
  return Storage.get(Storage.KEYS.SESSAO);
};
