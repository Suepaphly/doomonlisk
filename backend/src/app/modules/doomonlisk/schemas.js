const createUnlockControlsSchema = {
  $id: 'doom/unlock/controls',
  type: 'object',
  required: ['blocksLeft', 'playerName', 'amount'],
  properties: {
    blocksLeft: {
      type: 'uint32',
      fieldNumber: 1,
    },   
    playerName: {
      type: 'string',
      fieldNumber: 2,
    }, 
    blocksLeft: {
      type: 'uint32',
      fieldNumber: 3,
    },   
  },
  default: { 
      blocksLeft: 0,
      playerName: "Anonymous",
      amount: 0,
  },
};
