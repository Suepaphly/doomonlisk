const createUnlockControlsSchema = {
  $id: 'doom/unlock/controls',
  type: 'object',
  required: ['blocksLeft', 'playerName'],
  properties: {
    blocksLeft: {
      type: 'uint32',
      fieldNumber: 1,
    },   
    playerName: {
      type: 'string',
      fieldNumber: 2,
    }, 
  },
  default: { 
      blocksLeft: 0,
      playerName: "Anonymous",
      initValue: 1,
      name: "",
  },
};
