module.exports = {
    // a function to run the logic for this role


    run: function(creep) {
      // if the creep isnt doing anything
      if (creep.memory.working == false) {
        // switch state
        creep.memory.working = true;
      }

      //if the creep working
      if (creep.memory.working == true) {
        // try to find an enemy creep
        var enemyLoc = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {});
        // if we found one
        if (enemyLoc != undefined) {
            // try to attack, if not in range move towards the enemy
            if (creep.attack(enemyLoc) == ERR_NOT_IN_RANGE) {
              creep.moveTo(enemyLoc);
            }
            else {
              creep.attack(enemyLoc);
            }
        }
        // if we cant find an enemy go to sleep
        else {
        creep.memory.working = false;
        }
      }
    }
};
