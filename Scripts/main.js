// import modules
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {
    // check for memory entries of died creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }

    // for every creep name in Game.creeps
    for (let name in Game.creeps) {
        // get the creep object
        var creep = Game.creeps[name];

        // if creep is harvester, call harvester script
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        // if creep is upgrader, call upgrader script
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }

    //goal: have atleast 6 creeps at all times
    var minimumNumberOfTotalCreeps = 5;
    // goal: have 10 harvesters and as many upgraders as possible
    var minimumNumberOfHarvesters = 6;
    // _.sum will count the number of properties in Game.creeps filtered by the
    //  arrow function, which checks for the creep being a harvester
    var numberOfCreeps = Object.keys(Game.creeps).length
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var name = undefined;

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
          // else try to spawn an upgrader
          // small change from what you saw in the video: for upgraders it makes
          //  more sense to have two move parts because they have to travel further
          name = Game.spawns.Mainbase.createCreep([WORK,CARRY,MOVE,MOVE], undefined,
              { role: 'upgrader', working: false});
      }
    }


    // print name to console if spawning was a success
    // name > 0 would not work since string > 0 returns false
    if (!(name < 0)) {
        console.log("Spawned new creep: " + name);
    }
    //prints the total energy available to the console
    console.log("Total energy: " + Game.spawns.Mainbase.room.energyAvailable);
    //prints the total number of creeps to the console.
    console.log("Total creeps: " + numberOfCreeps);
    //prints the number of harvester creeps to the console.
    console.log("Total harvester creeps: " + numberOfHarvesters);
    //prints the number of upgrader creeps to the console
    console.log("Total upgrader creeps: " + (numberOfCreeps - numberOfHarvesters));
    // line break in the console
    // TO CHANGE: replace with console clear command and move to top of the loop
    console.log("")
};
