;(function () {
    window.ms = {
        set:set,
        get:get,
    };
    function set(key,val) {
        localStorage.setItem(key,JSON.stringify(val));
      }
    function get(key) {
        var json = localStorage.getItem(key);
        if(json){
            return JSON.parse(json);
        }
    }
})()

ms.set('name','wanghuahua');
var name1 = ms.get('name');
console.log(name1)