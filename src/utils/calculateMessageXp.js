module.exports = (messages) => {
    const baseXp = 10;
    const minMessages = 1;
    
    return baseXp * (messages || minMessages);
  };
  