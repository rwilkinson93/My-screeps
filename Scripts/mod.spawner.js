module.exports = {
  run: function(spawn) {
    // if not enough creeps
    if (numberOfCreeps < minimumNumberOfTotalCreeps) {
      // try to spawn a basic harvester creep
      name = Game.spawns.Mainbase.createCreep([WORK,CARRY,MOVE], undefined,
              { role: 'harvester', working: false});
    }
    // if there are more than 6 total creeps
    else {
      // but not enough harvesters
      if (numberOfHarvesters < minimumNumberOfHarvesters) {
          // try to spawn one
          name = Game.spawns.Mainbase.createCreep([WORK,WORK,CARRY,MOVE], undefined,
              { role: 'harvester', working: false});
      }
      else {
        if (numberOfUpgraders < minimumNumberOfUpgraders ) {
          // else try to spawn an upgrader
          // small change from what you saw in the video: for upgraders it makes
          //  more sense to have two move parts because they have to travel further
          name = Game.spawns.Mainbase.createCreep([WORK,CARRY,MOVE,MOVE], undefined,
              { role: 'upgrader', working: false});
        }
        else {
           if (numberOfBuilders < minimumNumberOfBuilders) {
             name = Game.spawns.Mainbase.createCreep([WORK,WORK,CARRY,MOVE], undefined,
              { role: 'builder', working: false});
           }
           else if (numberOfRepairers < minimumNumberOfRepairers) {
             // try to spawn one
             name = Game.spawns.Mainbase.createCreep([WORK,WORK,CARRY,MOVE], undefined,
               { role: 'repairer', working: false});
             }
           else {
             name = Game.spawns.Mainbase.createCreep([WORK,CARRY,MOVE,MOVE], undefined,
              { role: 'upgrader', working: false});
           }
        }
      }
    }
    // print name to console if spawning was a success
    // name > 0 would not work since string > 0 returns false
    if (!(name < 0)) {
        console.log("Spawned new " + creep.memory.role + " creep: " + name);
    }
  };
}
