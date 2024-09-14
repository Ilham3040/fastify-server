import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
    const addinguser = await prisma.users.createMany({
        data : [
            {name: "Ilham"},
            {name: "Dida"},
            {name: "Zakaria"},
            {name: "Laron"},
            {name: "Nia"},
            {name: "Udin"},
            {name: "Wawan"},
        ]
    })

    const addingitem = await prisma.items.createMany({
        data : [
            {name : "Sabun Mandi"},
            {name : "Sabun Muka"},
            {name : "Sabun Cuci"},
            {name : "Sampo"},
            {name : "Pasta Gigi"},
        ]
    })

    const addingorders = await prisma.orders.createMany({
        data : [
            {user_id : 1,item_id: 1},
            {user_id : 1,item_id: 2},
            {user_id : 1,item_id: 3},
            {user_id : 2,item_id: 1},
            {user_id : 2,item_id: 3},
            {user_id : 2,item_id: 5},
            {user_id : 3,item_id: 1},
            {user_id : 3,item_id: 2},
            {user_id : 3,item_id: 4},
            {user_id : 3,item_id: 5},
            {user_id : 4,item_id: 2},
            {user_id : 4,item_id: 4},
            {user_id : 4,item_id: 5},
            {user_id : 5,item_id: 5},
            {user_id : 5,item_id: 2},
            {user_id : 5,item_id: 5},
            {user_id : 6,item_id: 1},
            {user_id : 6,item_id: 2},
            {user_id : 6,item_id: 3},
            {user_id : 6,item_id: 4},
            {user_id : 6,item_id: 5},
        ]
    })
    
}


main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });