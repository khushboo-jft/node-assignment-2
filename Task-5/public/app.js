$(document).ready(function () {
    let hid;
    let count=0;
    let empData = [];
    const id=document.getElementById('isbn');


    $('#table').on('click', '.btn-edit', function () {
        hid = this.id;
        count=hid;
         console.log(hid);
        
        $.ajax({
            url: `http://localhost:8000/emp/${hid}`,
            method: 'GET',
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
        // const id = $(this).parent().parent().find(".names").attr("data-id");
        hid=this.id;
        console.log(hid);
        $.ajax({
            url: `http://localhost:8000/emp/${hid}`,
            method: 'DELETE',
            success: function () {
                loadData();

            }
        })
       
    });
    $('#addbtn').click(function () {
        var names = $("#names").val();
        var job = $("#job").val();
        var salary = $("#salary").val();
        $.ajax({
            url: "http://localhost:8000/emp",
            method: 'POST',
            data: {
                id:empData.length+1,
                'names': names,
                'job': job,
                'salary': parseInt(salary)
            },
            success: function (response) {
                clearForm();
                loadData(response);
                console.log(response);
            }
        })
    }) /
        $("#savebtn").click(function () {
            debugger;
            var names = $("#names").val();
            var job = $("#job").val();
            var salary = $("#salary").val();
            // const id = $(this).parent().parent().find("#names").attr("data-id");

            // var id]=$("#names").attr
            
            console.log(count)
            
            $.ajax({
                url: `http://localhost:8000/emp/${count}`,
                method: 'PUT',
                data: {
                    
                    names: names,
                    job: job,
                    salary: salary,
                },
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
            url: "http://localhost:8000/emp",
            beforeSend: clearForm(),
            success: function (arr) {
                empData = arr;

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
