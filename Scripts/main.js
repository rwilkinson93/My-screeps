// import modules
require('prototype.spawner')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

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
        // if creep is builder, call builder script
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        // if creep is repairer, call repairer script
        else if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }

    //goal: have atleast 6 creeps at all times
    var minimumNumberOfTotalCreeps = 3;
    // goal: have 10 harvesters and as many upgraders as possible
    var minimumNumberOfHarvesters = 6;
    var minimumNumberOfBuilders = 2;
    var minimumNumberOfUpgraders = 1;
    var minimumNumberOfRepairers = ((minimumNumberOfBuilders*2)-1);
    // _.sum will count the number of properties in Game.creeps filtered by the
    //  arrow function, which checks for the creep being a certain role
    var numberOfCreeps = Object.keys(Game.creeps).length
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');

    // gets the available energy in the room where Mainbase is
    var energyAvailable = game.spawn.Mainbase.room.energyAvailable;
    // gets the total energy capacity in the room where Mainbase is
    var energyCap = game.spawn.Mainbase.room.energyCapacityAvailable
    var name = undefined;

    // if not enough creeps
     if (numberOfCreeps < minimumNumberOfTotalCreeps) {
       //create the smallest possible harvester
       name = Game.spawns.Mainbase.createCreep([WORK,CARRY,MOVE], undefined
            { role: 'harvester', working: false});
     }
    // if not enough harvesters
    else if (numberOfHarvesters < minimumNumberOfHarvesters) {
        // try to spawn one
        name = Game.spawns.Mainbase.createCustomCreep(energy, 'harvester');
        // if spawning failed and we have no harvesters left
        if (name == ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters == 0) {
            // spawn one with what is available
            name = Game.spawns.Mainbase.createCustomCreep(
                Game.spawns.Mainbase.room.energyAvailable, 'harvester');
        }
    }
    // if not enough upgraders
    else if (numberOfUpgraders < minimumNumberOfUpgraders) {
        // try to spawn one
        name = Game.spawns.Mainbase.createCustomCreep(energy, 'upgrader');
    }
    // if not enough repairers
    else if (numberOfRepairers < minimumNumberOfRepairers) {
        // try to spawn one
        name = Game.spawns.Mainbase.createCustomCreep(energy, 'repairer');
    }
    // if not enough builders
    else if (numberOfBuilders < minimumNumberOfBuilders) {
        // try to spawn one
        name = Game.spawns.Mainbase.createCustomCreep(energy, 'builder');
    }
    else {
        // else try to spawn a upgrader
        name = Game.spawns.Mainbase.createCustomCreep(energy, 'upgrader');
    }

    if (!(name < 0)) {
      console.console.log("Spawned new creep: " + name);
    }

    //prints the total energy available to the console
    console.log("Total energy: " + Game.spawns.Mainbase.room.energyAvailable);
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
