const createUnlockControlsSchema = {
  $id: 'doom/unlock/controls',
  type: 'object',
  required: ['blocksLeft'],
  properties: {
    blocksLeft: {
      type: 'uint32',
      fieldNumber: 1,
      items: {
        dataType: 'bytes',
      },
    },    
  },
  default: { 
      blocksLeft: 0,
      initValue: 1,
      name: "",
  },
};
