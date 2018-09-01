module.exports = {
    // a function to run the logic for this role


    run: function(creep) {
      //find the location of Mainbase and set this to the creeps home in memory
      creep.memory.home = Game.spawns.Mainbase.pos;
      //search the creeps current location for hostile creeps
      creep.memory.target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

      // if we find a target set working to true
      if (creep.memory.target != null) {
        creep.memory.working = true;
      }
      // otherwise set working to false
      else {
        creep.memory.working = false;
      }

      // if working is true try to attack target
      if (creep.memory.working == true ) {
        // if not in range
        if (creep.attack(creep.memory.target) == ERR_NOT_IN_RANGE) {
          // move towards the target
          creep.moveTo(creep.memory.target);
        }
        // if in range
        else {
          // attack
          creep.attack(creep.memory.target);
        }
      }
    }
};
