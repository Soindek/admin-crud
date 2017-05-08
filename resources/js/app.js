var controller = (function(httpCtrl, phoneCtrl) {
    
    var setupButtons = function() {
        
        //Display the 'new device form'
        document.querySelector('.add-btn').addEventListener('click', function() {
                document.querySelector('.table').style.display = 'none';
                document.querySelector('.item-form').style.display = 'block';
            });

        //Hide the 'new device form' without save
        document.querySelector('.cancel-btn').addEventListener('click', function() {
                document.querySelector('.table').style.display = 'block';
                document.querySelector('.item-form').style.display = 'none';
            });
        
        
        //Save a new phone
        document.getElementById('submit').addEventListener('click', function() {
    
            httpService.savePhone(phoneCtrl.extractDeviceFromForm(), this.refresh); 
            
        });
        
    };
    
    var loadDataTablePage = function() {
        
        var pageParts, page;
        
        pageParts = location.search.split('page=');
        
        page =  pageParts.length > 1 ? pageParts[1] : 1;
        
        httpService.requestTableData({'page':page, 'size': 10, 'sortMap': {'id':'DESC'}}, phoneCtrl.fillTableWithData);
        
    };
    
    
    return {
        init: function() {
            setupButtons();
            loadDataTablePage(); 
        },
        
        refresh: function() {
            
            document.querySelector('.device-list').innerHTML = '';
            document.querySelector('.pages').innerHTML = '';
            
            loadDataTablePage();
        }
    };
    
})(httpService, phoneController);


controller.init();