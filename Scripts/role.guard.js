module.exports = {
    // a function to run the logic for this role


    run: function(creep) {
      //find the location of Mainbase and set this to the creeps home in memory
      creep.memory.homeFlag = Game.flags.MusterPoint1.pos;
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
      // if the guards are no longer needed
      if (creep.memory.working == false) {
        // if the creep is already at the location of homeFlag
        if (creep.pos == creep.memory.homeFlag.pos)
        {
          //suicide to reduce number of creeps
          creep.suicide();
        }
        //else
        else {
          //move to homeFlag to get out of the way once enemies are gone
          creep.moveTo(creep.memory.homeFlag);
        }
      }
    }
};
