const sql = require('mssql');
const bcrypt = require('bcrypt');
const bcryptPromise = require('bcrypt-promise');
const { poolPromise } = require('../data/db');
const jwt = require('jsonwebtoken');


const getAllTaverns = async function(req, res) {
    res.setHeader('ContentType', 'application/json');
    let taverns;
    
    
    const pool = await poolPromise;
    

    try {
        taverns = await pool
            .request()
            .query(
                'SELECT TavernName, ID FROM Taverns ',
            );
        taverns = taverns.recordset;
    } catch (error) {
        returnError(res, error, 500);
    }

    returnSuccessResponse(res, taverns)
};

module.exports.getAllTaverns = getAllTaverns;


const getMyTaverns = async function(req, res) {
    res.setHeader('ContentType', 'application/json')

    let myTaverns;
    console.log(req.user, "myTaverns req");

    const pool = await poolPromise;

    try {
        myTaverns = await pool
            .request()
            .input('tavernID', sql.VarChar, req.user.TavernID)
            .query(
                'SELECT * FROM Taverns WHERE ID = @tavernID'
            );
        myTaverns = myTaverns.recordset.shift();
        
    } catch (error) {
        returnError(res, error, 500);
    }

    returnSuccessResponse(res, myTaverns)
}

module.exports.getMyTaverns = getMyTaverns;

const getRooms = async function(req) {
    const pool = await poolPromise;

    let result;
    let baseSql = 'SELECT * FROM dbo.Rooms';
    let filter = [];
    filter.push('TavernID = @TavernID')
    let roomId = 0;
    let name = '';
    if (req.params.id != undefined) {
        roomId = req.params.id;
        filter.push('ID = @ID')
    }
    if (req.query.RoomName != undefined && req.query.RoomName != '') {
        name = req.query.RoomName;
        filter.push(`RoomName LIKE '%' + @RoomName + '%'`)
    }
    baseSql += ' WHERE ' + filter.join(' AND ');
    if (req.query.OrderBy == 'DailyRate') {
        baseSql += ' ORDER BY DailyRate DESC, RoomName';
    } else {
        baseSql += ' ORDER BY RoomName';
    }
    
     try {
        result = await pool
            .request()
            .input('RoomName', sql.VarChar, name)
            .input('TavernID', sql.Int, req.user.TavernID)
            .input('ID', sql.Int, roomId)
            .query(baseSql);
    } catch (e) {
       throwError(e.message);
    }
    if (roomId == 0) {
        return result.recordset
    } else {
        return result.recordset[0];
    }

}

getTavernRooms = async function(req, res) {
    res.setHeader('ContentType', 'application/json');
    let err, rooms;
    [err, rooms] = await executeOrThrow(getRooms(req));
    if (err) {
        return returnError(res, err, 422);
    }
    return returnSuccessResponse(res, rooms, 200, console.log('rooms here'))
};

module.exports.getTavernRooms = getTavernRooms;

getRoom = async function(req, res) {
    res.setHeader('ContentType', 'application/json');
    let err, room;
    [err, room] = await executeOrThrow(getRooms(req));
    if (err) {
        return returnError(res, err, 422);
    }
    return returnSuccessResponse(res, room, 200, console.log('room here'))
};
module.exports.getRoom = getRoom;

const saveAndInsert = async function(req) {
    const pool = await poolPromise;
    let result;
    let baseSql = '';
    if (req.body.ID == 0) {
        baseSql = 'INSERT INTO Rooms ([RoomName], [DailyRate], [RoomStatus], [TavernID])'
        baseSql += ' VALUES (@RoomName, @DailyRate, 1, @tavernID)'
    } else {
        baseSql = 'UPDATE Rooms SET DailyRate = @DailyRate, RoomName = @RoomName WHERE ID = @ID'
    }
    try {
        result = await pool
            .request()
            .input('RoomName', sql.VarChar, req.body.RoomName)
            .input('tavernID', sql.Int, req.user.TavernID)
            .input('DailyRate', sql.VarChar, req.body.DailyRate)
            .input('ID', sql.Int, req.body.ID)
            .query(baseSql);
    } catch (e) {
        throwError(e.message);
    }
    return {id: result.recordset[0].ID};
}

save = async function(req, res) {
    res.setHeader('ContentType', 'application/json');
    let err, id;
    [err, id] = await executeOrThrow(saveAndInsert(req));
    if (err) {
        return returnError(res, err, 422);
    }
    return returnSuccessResponse(res, id, 201)
}
module.exports.save = save;

const insert = async function(req, res) {
    res.setHeader('ContentType', 'application/json');
    const body = req.body;
    
 

    if (!body.RoomName) {
        return returnError(res, 'Please enter a name', 422);
    }
    const pool = await poolPromise;
    
    try {
        room = await pool
            .request()
            .input('RoomName', sql.VarChar, body.RoomName)
            .input('DailyRate', sql.Int, 2)
            .input('RoomStatus', sql.Int, 1)
            .input('tavernID', sql.Int, req.user.TavernID)
            .query(
                'INSERT INTO Rooms ([RoomName], [DailyRate], [RoomStatus], [TavernID]) OUTPUT inserted.* values (@RoomName, @DailyRate, @RoomStatus, @tavernID)',
            );
        room = room.recordset.shift();
    } catch (e) {
        returnError(res, e, 500);
    }

    return returnSuccessResponse(res, room, 201);
};

module.exports.insert = insert;


const editRoom = async function(req, res) {
    res.setHeader('ContentType', 'application/json');
    const body = req.body;
    
    const pool = await poolPromise;
    
    try {
        result = await pool
            .request()
            .input('RoomName', sql.VarChar, body.RoomName)
            .input('ID', sql.Int, body.id)
            .input('DailyRate', sql.Int, body.DailyRate)
            .query(
                `UPDATE Rooms SET DailyRate = @DailyRate, RoomName = @RoomName WHERE ID = @ID`,
            );
        result = result.recordset.shift();
    } catch (e) {
        returnError(res, e, 500);
    }

    return returnSuccessResponse(res, result, 201);
};

module.exports.editRoom = editRoom;


