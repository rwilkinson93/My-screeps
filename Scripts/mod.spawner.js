module.exports = {
  //goal: have atleast 6 creeps at all times
  var minimumNumberOfTotalCreeps = 5;
  // goal: have 10 harvesters and as many upgraders as possible
  var minimumNumberOfHarvesters = 6;
  var minimumNumberOfBuilders = 3;
  var minimumNumberOfUpgraders = 1;
  var minimumNumberOfRepairers = ((minimumNumberOfBuilders*2)-1);
  // _.sum will count the number of properties in Game.creeps filtered by the
  //  arrow function, which checks for the creep being a certain role
  var numberOfCreeps = Object.keys(Game.creeps).length
  var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
  var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
  var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
  var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
  var name = undefined;

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
