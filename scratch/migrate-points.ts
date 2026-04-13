import { getMembers, getTasks, saveMembers, updateMember } from "./lib/members";

async function migrate() {
  console.log("Starting migration...");
  const members = await getMembers();
  const tasks = await getTasks();

  for (const member of members) {
    const memberTasks = tasks.filter(t => t.toMemberId === member.id && t.status === "done");
    const totalPoints = memberTasks.reduce((sum, t) => sum + (t.points || 1), 0);
    
    console.log(`Member ${member.name}: ${totalPoints} points from ${memberTasks.length} tasks.`);
    member.creditPoints = totalPoints;
  }

  await saveMembers(members);
  console.log("Migration complete.");
}

migrate().catch(console.error);
