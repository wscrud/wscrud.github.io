var Database_Name = 'MyDatabase';
var Version = 1.0;
var Text_Description = 'My First Web-SQL Example';
var Database_Size = 2 * 1024 * 1024;
var dbObj = openDatabase(Database_Name, Version, Text_Description, Database_Size);
dbObj.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS Employee_Table (id unique, Name, Location,did)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS dept_Table (did unique, dName,estd)');
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!  
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    var today = dd + '/' + mm + '/' + yyyy;
    tx.executeSql('insert into dept_Table(did, dName, estd) values(1,"IT","' + today + '")');
    tx.executeSql('insert into dept_Table(did, dName, estd) values(2,"Accountant","' + today + '")');
    tx.executeSql('insert into dept_Table(did, dName, estd) values(3,"Claerk","' + today + '")');
    tx.executeSql('insert into dept_Table(did, dName, estd) values(4,"Management","' + today + '")');
    alldetails();
});

function Insert() {
    var id = document.getElementById("tbID").value;
    var name = document.getElementById("tbName").value;
    var location = document.getElementById("tbLocation").value;
    var did = document.getElementById("tbLdept").value;
    dbObj.transaction(function(tx) {
        tx.executeSql('insert into Employee_Table(id, Name, Location,did) values(' + id + ',"' + name + '","' + location + '",' + did + ')');
    });
    alldetails();
}

function del() {
    var id = document.getElementById("ddlid").value;
    //  alert(id);  
    dbObj.transaction(function(tx) {
        tx.executeSql('delete from Employee_Table where id=' + id + '');
    });
    empidbind();
    alldetails();
}

function myFunction() {
    var id = document.getElementById("ddlid").value;
    dbObj.transaction(function(tx) {
        tx.executeSql('SELECT * from Employee_Table where id=' + id + '', [], function(tx, results) {
            document.getElementById("tbName").value = results.rows.item(0).Name;
            document.getElementById("tbLocation").value = results.rows.item(0).Location;
            document.getElementById("tbLdept").value = results.rows.item(0).did;
        }, null);
    });
}

function showdel() {
    empidbind();
    $('#tdorginal').hide();
    $('#tdid').show();
    $('#btnupdate').hide();
    $('#btnInsert').hide();
    $('#btndel').show();
    $('#btninsertshw').show();
    $('#btnupdateshw').show();
    $('#btndeleteshw').hide();
    $('#rowName').hide();
    $('#rowLocation').hide();
    $('#rowdept').hide();
}

function showin() {
    $('#tdid').hide();
    $('#tdorginal').show();
    $('#btnupdate').hide();
    $('#btnInsert').show();
    $('#btndel').hide();
    $('#btninsertshw').hide();
    $('#btnupdateshw').show();
    $('#btndeleteshw').show();
    $('#rowName').show();
    $('#rowLocation').show();
    $('#rowdept').show();
    document.getElementById("tbID").value = '';
    document.getElementById("tbName").value = '';
    document.getElementById("tbLocation").value = '';
    document.getElementById("tbLdept").value = '1';
    empidbind();
}

function empidbind() {
    dbObj.transaction(function(tx) {
        tx.executeSql('SELECT * from Employee_Table', [], function(tx, results) {
            var len = results.rows.length,
                i;
            document.getElementById("ddlid").innerHTML = '';
            var str = '';
            for (i = 0; i < len; i++) {
                str += "<option value=" + results.rows.item(i).id + ">" + results.rows.item(i).id + "</option>";
                document.getElementById("ddlid").innerHTML += str;
                str = '';
            }
        }, null);
    });
}

function showupdte() {
    empidbind();
    $('#tdorginal').hide();
    $('#tdid').show();
    $('#btnupdate').show();
    $('#btnInsert').hide();
    $('#btndel').hide();
    $('#btninsertshw').show();
    $('#btnupdateshw').hide();
    $('#btndeleteshw').show();
    $('#rowName').show();
    $('#rowLocation').show();
    $('#rowdept').show();
}

function updte() {
    var id = document.getElementById("ddlid").value;
    var name = document.getElementById("tbName").value;
    var location = document.getElementById("tbLocation").value;
    var did = document.getElementById("tbLdept").value;
    dbObj.transaction(function(tx) {
        tx.executeSql('update Employee_Table set Name="' + name + '",Location="' + location + '",did=' + did + ' where id=' + id + '');
    });
    alldetails();
}

function alldetails() {
    dbObj.transaction(function(tx) {
        tx.executeSql('SELECT e.id,e.Name,e.Location,d.dName,d.did FROM Employee_Table e inner join dept_Table d on e.did=d.did ', [], function(tx, results) {
            var len = results.rows.length,
                i;
            $("#tblGrid").find("tr:gt(0)").remove();
            var str = '';
            for (i = 0; i < len; i++) {
                str += "<tr>";
                str += "<td>" + results.rows.item(i).id + "</td>";
                str += "<td>" + results.rows.item(i).Name + "</td>";
                str += "<td>" + results.rows.item(i).Location + "</td>";
                str += "<td>" + results.rows.item(i).dName + "</td>";
                str += "</tr>";
                // document.getElementById("tblGrid").innerHTML += str;
                $('#tblGrid')[0].innerHTML += str
                str = '';
            }
        }, null);
    });
}

dbObj.transaction(function(tx) {
    tx.executeSql('SELECT * from dept_Table', [], function(tx, results) {
        var len = results.rows.length,
            i;
        var str = '';
        for (i = 0; i < len; i++) {
            str += "<option value=" + results.rows.item(i).did + ">" + results.rows.item(i).dName + "</option>";
            // document.getElementById("tbLdept").innerHTML += str;
            $('#tbLdept')[0].innerHTML += str
            str = '';
        }
    }, null);
});