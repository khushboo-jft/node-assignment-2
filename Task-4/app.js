$(document).ready(function () {
    let hid;
    let empData = [];
    count=0;
    // const id=document.getElementById('isbn');
    $('#table').on('click', '.btn-edit', function () {
        hid = this.id;
        count=hid
         console.log(hid);
        
        $.ajax({
            url: `http://localhost:3030/user?id=${hid}`,
            type: 'GET',
            success: function (product) {
                console.log(product)

                $("#names").val(product.names);
                $("#job").val(product.job);
                $("#salary").val(product.salary);
                $("#addbtn").hide();
                $("#savebtn").show();
            }
        })
    });
    $("#table").on('click', '.btn-delete', function () {
       
        hid=this.id;
        console.log(hid);
        $.ajax({
            url: `http://localhost:3030/user/delete?id=${hid}`,
            type: 'DELETE',
            success: function (response) {
                console.log(response)
                loadData(response);

            }
        })
       
    });
    
    $('#addbtn').click(function () {
        // debugger;
        var names = $("#names").val();
        var job = $("#job").val();
        var salary = $("#salary").val();
        $.ajax({
            url: "http://localhost:3030/user",
            method: 'POST',
            data: JSON.stringify({
                'id':empData.length+1,
                'names': names,
                'job': job,
                'salary': salary
            }),
            success: function (response) {
                clearForm();
                loadData(response);
                console.log(response);
            }
        })
    }) 
        $("#savebtn").click(function () {
            var names = $("#names").val();
            var job = $("#job").val();
            var salary = $("#salary").val();
            $.ajax({
                url: `http://localhost:3030/user/update?id=${count}`,
                method: 'PUT',
                data: JSON.stringify({
                    names: names,
                    job: job,
                    salary: salary,
                }),
                success: function (response) {
                    clearForm()
                    loadData(response);
                }
            })
        });
    function clearForm() {
        $("#names").val("");
        $("#job").val("");
        $("#salary").val("");
        $("#addbtn").show();
        $("#savebtn").hide();
    }
    function loadData() {
        $.ajax({
            method: "GET",
            url: "http://localhost:3030/users",
            beforeSend: clearForm(),
            success: function (arr) {
                empData = arr;
                console.log(empData)
                $("#empDetails").html("");
                arr.forEach((i) => {
                    let tabb = `<tr>
        <td>${i.names}</td>
        <td>${i.job}</td>
        <td>${i.salary}</td>
        <td><button class='btn btn-sm btn-success btn-edit' id="${i.id}">Edit</button>
            <button class='btn btn-sm btn-success btn-delete' id="${i.id}">Delete</button>
        </td></tr>`
                    $("#empDetails").append(tabb)
                })
            }
        })
    }
    (() => {

        loadData(JSON.parse(localStorage.getItem("data")) || [])

    })();
})
