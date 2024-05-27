const dataSource = [
    {
        id: 1,
        username: "John Smith",
        email: "johnsmith32@server.com",
    },
    {
        id: 2,
        username: "Helen Boyue",
        email: "helenboyue1987@server.com",
    },
];

function throwError (error = "Error: something went wrong") {
    throw new Error(error);
};

function getAllUsers() {
    return [...dataSource];
}

function getUserById(id) {
    const user = dataSource.find((user) => user.id === id);

    !user && throwError("User does not exist!");

    return user;
}

function createNewUser(data) {
    const newUser = { ...data, id: dataSource.length + 1 };

    dataSource.push(newUser);
    return newUser;
}

function updateUser(id, data) {
    const userIndex = dataSource.findIndex((user) => user.id === id);

    userIndex < 0 && throwError("User does not exist!");

    const updatedUser = { ...dataSource[userIndex], ...data };
    dataSource[userIndex] = updatedUser;

    return updatedUser;
}

function deleteUserById({ id }) {
    const userIndex = dataSource.findIndex((user) => user.id === id);
    
    userIndex < 0 && throwError("User does not exist!");

    dataSource.splice(userIndex, 1);
}

module.exports = {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUserById,
};
