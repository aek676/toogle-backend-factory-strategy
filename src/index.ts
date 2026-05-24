import { NodePlayerCreator } from "./creators/NodePlayerCreator";
import { SpringPlayerCreator } from "./creators/SpringPlayerCreator";

const nodeCreator = new NodePlayerCreator();
const springCreator = new SpringPlayerCreator();

console.log("=== Node Players ===");
console.log(nodeCreator.getPlayers());
console.log("Node Player with id 2:", nodeCreator.getPlayer("2"));

console.log("\n=== Spring Players ===");
console.log(springCreator.getPlayers());
console.log("Spring Player with id 5:", springCreator.getPlayer("5"));
