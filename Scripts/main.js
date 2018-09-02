// import modules
require('prototype.spawner')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleGuard = require('role.guard');
var roleScavenger = require('role.scavenger')

module.exports.loop = function () {

  //goal: have atleast 6 creeps at all times
  var minimumNumberOfTotalCreeps = 3;
  // goal: have 10 harvesters and as many upgraders as possible
  var minimumNumberOfHarvesters = 8;
  var minimumNumberOfUpgraders = 1;
  var minimumNumberOfBuilders = 2;
  var minimumNumberOfRepairers = ((minimumNumberOfBuilders*2)-1);
  var minimumNumberOfScavengers = 1;
  var cpuBuffer = (Game.cpu.limit / 2);
  var maximumNumberOfWorkerCreeps = ((Game.cpu.limit *3)-cpuBuffer);
  // _.sum will count the number of properties in Game.creeps filtered by the
  //  arrow function, which checks for the creep being a certain role
  var numberOfCreeps = Object.keys(Game.creeps).length
  var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
  var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
  var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
  var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
  var numberOfScavengers = _.sum(Game.creeps, (c) => c.memory.role == 'scavenger');
  var numberOfGuards = _.sum(Game.creeps, (c) => c.memory.role == 'guard');
  // gets the available energy in the room where Mainbase is
  var energyAvailable = Game.spawns.Mainbase.room.energyAvailable;
  // gets the total energy capacity in the room where Mainbase is
  var energyCap = Game.spawns.Mainbase.room.energyCapacityAvailable;
  var name = undefined;
  var mainRoom = Game.spawns.Mainbase.pos.roomName;
  var findHostiles = (Game.spawns['Mainbase'].room.find(FIND_HOSTILE_CREEPS));

  // if the spawn Mainbase can find any hostile creeps
  if (findHostiles.length > 0 )
  {
    //set memory.hostilesFound to true to begin spawning guards
    Game.spawns.Mainbase.memory.hostilesFound = true;
  }
  // if no hostiles encountered
  else {
    // set memory.hostilesFound to false to stop spawning guards
    Game.spawns.Mainbase.memory.hostilesFound = false;
  }

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
    else if (creep.memory.role == 'guard') {
        roleGuard.run(creep);
      }
    // if creep is builder, call builder script
    else if (creep.memory.role == 'builder') {
        roleBuilder.run(creep);
      }
    // if creep is repairer, call repairer script
    else if (creep.memory.role == 'repairer') {
        roleRepairer.run(creep);
      }
    else if (creep.memory.role == 'scavenger') {
        roleScavenger.run(creep);
      }
    }

    // if not enough creeps
    if (numberOfCreeps < minimumNumberOfTotalCreeps) {
      //create the smallest possible harvester
      name = Game.spawns.Mainbase.createCreep([WORK,CARRY,MOVE], undefined,
        { role: 'harvester', working: false});
      }
    // if not enough harvesters
    else if (numberOfHarvesters < minimumNumberOfHarvesters) {
      // try to spawn one
      name = Game.spawns.Mainbase.createCustomCreep(energyAvailable, 'harvester');
      // if spawning failed and we have no harvesters left
      if (name == ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters == 0) {
        //create the smallest possible harvester
        name = Game.spawns.Mainbase.createCreep([WORK,CARRY,MOVE], undefined,
          { role: 'harvester', working: false});
        }
    }
    // if not enough upgraders
    else if (numberOfUpgraders < minimumNumberOfUpgraders) {
      // try to spawn one
      name = Game.spawns.Mainbase.createCustomCreep(energyAvailable, 'upgrader');
    }
    // if hostiles have been found
    else if (Game.spawns.Mainbase.memory.hostilesFound == true) {
      //try to spawn a guard
      name = Game.spawns.Mainbase.createCreep([TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,MOVE,MOVE], undefined,
        { role: 'guard', working: false});
    }
    // if not enough repairers
    else if (numberOfRepairers < minimumNumberOfRepairers) {
      // try to spawn one
      name = Game.spawns.Mainbase.createCustomCreep(energyAvailable, 'repairer');
    }
    // if not enough builders
    else if (numberOfBuilders < minimumNumberOfBuilders) {
      // try to spawn one
      name = Game.spawns.Mainbase.createCustomCreep(energyAvailable, 'builder');
    }
    else if (numberOfScavengers < minimumNumberOfScavengers) {
      name = Game.spawns.Mainbase.createScavenger(energyAvailable, 'scavenger');
    }
    else {
      // if the number of (worker creeps - number of guards) is still less than maximumNumberOfWorkerCreeps
      if ((numberOfCreeps - numberOfGuards) < maximumNumberOfWorkerCreeps) {
        // try to spawn a upgrader
        name = Game.spawns.Mainbase.createCustomCreep(energyAvailable, 'upgrader');
      }
    }

    if (!(name < 0)) {
      console.log("Spawned new creep: " + name);
    }

    //prints the total energy available to the console
    console.log("Total worker creeps: " + (numberOfCreeps - numberOfGuards)+ ". Max worker creeps: " + maximumNumberOfWorkerCreeps);

    console.log("Total energy: " + energyAvailable);
    //prints the total number of creeps to the console.
    console.log("Total creeps: " + numberOfCreeps);
    //prints the number of harvester creeps to the console.
    console.log("Total harvester creeps: " + numberOfHarvesters);
    //prints the number of upgrader creeps to the console
    console.log("Total upgrader creeps: " + numberOfUpgraders);
    //prints the number of builder creeps to the console
    console.log("Total builder creeps: " + numberOfBuilders);
    //prints the number of repairer creeps to the console
    console.log("Total repairer creeps: " + numberOfRepairers);
    // line break in the console
    // TO CHANGE: replace with console clear command and move to top of the loop
    console.log("")
};
