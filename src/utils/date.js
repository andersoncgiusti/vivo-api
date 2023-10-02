const date = (value) => {
  const dataUtc = new Date(value);
  const dataBrasilia = dataUtc.toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  });
  return dataBrasilia;
};

module.exports = { date };
