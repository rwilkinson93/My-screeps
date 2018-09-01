// import modules
var creepCreation = require('mod.spawner');
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
        else if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }

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

    creepCreation.run(spawn);

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
