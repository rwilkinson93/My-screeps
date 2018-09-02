module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
      // if creep is scavenging and is at max energy capacity
      if (creep.memory.working == true && (creep.carry.energy == creep.carryCapacity)){
        // set working (scavenging) to false
        creep.memory.working = false;
      }
      // if the creep is not scavenging and is empty
      if (creep.memory.working == false && (creep.carry.energy == 0 )) {
        // set working (scavenging) to true
        creep.memory.working = true;
      }
      // if creep is scavenging and is not at max energy yet
      if (creep.memory.working == true && (creep.carry.energy != creep.carryCapacity)){
        // if the target has not been defined
        if (creep.memory.target == undefined) {
          // try to find a target
          creep.memory.target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, RESOURCE_ENERGY);
        }
        // if a target has been found
        else {
          // try to pick up energy
          // if the target is too far away
          if (creep.pickup(creep.memory.target.pos) == ERR_NOT_IN_RANGE) {
            //move towards the target
            creep.moveTo(creep.memory.target);
          }
          // if the target is invalid
          else if (creep.pickup(creep.memory.target.pos) == ERR_INVALID_TARGET) {
            //reset the target to undefined
            creep.memory.target = undefined;
          }
        }
      }
      // if creep is not scavenging and is carrying energy
      if (creep.memory.working == false && (creep.carry.energy <= creep.carryCapacity)) {
        // if the dropOffTarget has not yet been defined
        if (creep.memory.dropOffTarget == undefined) {
          // try to find a dropOffTarget
          // drop off targets are spawns/extensions that are not full
          creep.memory.dropOffTarget = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_SPAWN
                        || s.structureType == STRUCTURE_EXTENSION)
                        && s.energy < s.energyCapacity
              });
          }
        }
        // if a dropOffTarget has been found
        else {
          // try to transfer energyCap
          // if the dropOffTarget is too far away
          if (creep.transfer(creep.memory.dropOffTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            // move towards it
            creep.moveTo(creep.memory.dropOffTarget);
          }
        }
    }
};
