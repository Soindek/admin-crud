// HTTP REQUESTS CONTROLLER

var httpService = (function() {
    
    return {
        
//Data table endpoint
         requestTableData: function(param, callback) {

            var request = new XMLHttpRequest();
            param = JSON.stringify(param);

            request.onreadystatechange = function() {
                if (request.readyState === 4 && request.status === 200) {
                    callback.call(JSON.parse(this.responseText)); 
                }
            };

            request.open('POST', 'http://localhost:8080/api/product/data-table', true);
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(param);

        },
        
        
//Create new product endpoint
        savePhone: function(product, callback) {
        
            var request, device;

            request = new XMLHttpRequest();

            request.onreadystatechange = function() {          
                if (request.readyState === 4 && request.status === 200) {
                    callback(); //refresh
                }
            };

            device = JSON.stringify(product);
            
            request.open('POST', 'http://localhost:8080/api/product', true);
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(device);

        },
        
        
//Load product data from server
        loadPhone: function(id, callback) {
            
            var request, device;
            
            request = new XMLHttpRequest();

            request.onreadystatechange = function() {
                if (this.readyState === 4 && request.status === 200) {
                    callback.call(JSON.parse(this.responseText));
                }
            };

            request.open("PUT", "http://localhost:8080/api/product/" + id, true);
            request.setRequestHeader("content-type", "application/json");
            request.send(device);
            
        },
    
    
//Update product endpoint
        updatePhone: function(data, callback) { //rename: updatePhone

            var device, request;
            
            device = JSON.stringify(data);

            request = new XMLHttpRequest();

            request.onreadystatechange = function() {
                if (this.readyState === 4 && request.status === 200) {
                    callback(); //refresh
                }
            };

            request.open("PUT", "http://localhost:8080/api/product", true);
            request.setRequestHeader("content-type", "application/json");
            request.send(device);
            
            
        },


//Delete product endpoint
        deleteDevice: function(id, callback) {
            
            var device, request;
            
            device = JSON.stringify(false);
            
            request = new XMLHttpRequest();
            
            request.onreadystatechange = function() {
                if (this.readyState === 4 && request.status === 200) {
                    callback(); //refresh
                }
            };
            
            request.open('DELETE', 'http://localhost:8080/api/product/' + id, true);
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(device);
            
        }
    
    };
    
})();





