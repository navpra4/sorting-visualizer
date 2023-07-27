var inp_array_size = document.getElementById("a_size");
var inp_gen = document.getElementById("a_gen");
var inp_array_speed = document.getElementById("a_speed");
var array_size= inp_array_size.value;
var buttons_algos = document.querySelectorAll(".algos button");
var container = document.getElementById("array_container");
var div_sizes=[];
var divs= [];
var margin_size= 0.05;
var bubble = document.getElementById("Bubble");
var selection = document.getElementById("Selection");
var insertion = document.getElementById("Insertion");
var merge = document.getElementById("Merge");
var quick = document.getElementById("Quick");
var heap = document.getElementById("Heap");
var c_delay = 0;
var speed = 1000;
var delay_time = 10000/(Math.floor(array_size/10)*speed);

const set_speed = ()=>{
    speed = Math.pow(10,inp_array_speed.value);
    delay_time = 10000/(Math.floor(array_size/10)*speed);
}

const generate_array = ()=>{
    container.innerHTML= "" ;
    for(var i=0;i<array_size;i++)
        {
            div_sizes[i]=Math.floor(Math.random() * 0.5*(inp_array_size.max - inp_array_size.min)) + 5;
            divs[i]=document.createElement("div");
            container.appendChild(divs[i]);
            
            divs[i].style=" margin:0% " + margin_size + "%; background-color:blue; width:" + (100/array_size-(2*margin_size)) + "%; height:" + (div_sizes[i]) + "%;";
        }
};

const update_array_size = ()=>{
    array_size = inp_array_size.value;
    generate_array();
};

const disable_buttons = ()=>{
    inp_array_size.disabled=true;
    inp_gen.disabled=true;
    inp_array_speed.disabled=true;
    for(var i=0;i<buttons_algos.length;i++){
        buttons_algos[i].disabled=true;
    }
   
};

const div_update = (container,height,color)=>{
    window.setTimeout(()=>{
        container.style=" margin:0% " + margin_size + "%; width:" + (100/array_size-(2*margin_size)) + "%; height:" + height + "%; background-color:" + color + ";";
    },c_delay+=delay_time);
};

const enable_buttons= ()=>{
    window.setTimeout(()=>{
        inp_array_size.disabled=false;
        inp_gen.disabled=false;
        inp_array_speed.disabled=false;
        for(var i=0;i<buttons_algos.length;i++){
            buttons_algos[i].disabled=false;
        }
    },c_delay+=delay_time);
}

const bubble_sort = ()=>{
    disable_buttons();
    for(var i=0;i<array_size-1;i++){
        for(var j=0;j<array_size-i-1;j++){
            div_update(divs[j],div_sizes[j],"yellow");
            if(div_sizes[j]>div_sizes[j+1]){
                div_update(divs[j],div_sizes[j],"red");
                div_update(divs[j+1],div_sizes[j+1],"red");
                //swapping
                var temp =div_sizes[j];
                div_sizes[j]=div_sizes[j+1];
                div_sizes[j+1]=temp;
                //update sizes
                div_update(divs[j],div_sizes[j],"red");
                div_update(divs[j+1],div_sizes[j+1],"red");
            };
            div_update(divs[j],div_sizes[j],"blue");
        };
        div_update(divs[j],div_sizes[j],"green");
    };
    div_update(divs[0],div_sizes[0],"green");
    enable_buttons();
};

const selection_sort =()=>{
    disable_buttons();
    for(var i=0;i<array_size-1;i++){
        var min_index = i;
        div_update(divs[i],div_sizes[i],"red");
        for(var j=i+1;j<array_size;j++){
            div_update(divs[j],div_sizes[j],"yellow");
            if(div_sizes[j]<div_sizes[min_index]){
                div_update(divs[min_index],div_sizes[min_index],"blue");
                min_index=j;
                div_update(divs[min_index],div_sizes[min_index],"red");
            }else{
                div_update(divs[j],div_sizes[j],"blue");
            };
        };
        div_update(divs[min_index],div_sizes[min_index],"red");
        //swap
        var temp =div_sizes[i];
        div_sizes[i]=div_sizes[min_index];
        div_sizes[min_index]=temp;
        div_update(divs[min_index],div_sizes[min_index],"blue");
        div_update(divs[i],div_sizes[i],"green");
        
    };
    div_update(divs[array_size-1],div_sizes[array_size-1],"green");
    enable_buttons();
};

const insertion_sort =()=>{
    disable_buttons();
    for(var i=0;i<array_size;i++){
        var key = div_sizes[i];
        div_update(divs[i],div_sizes[i],"yellow");
        var j =i-1;
        while(j>=0 && div_sizes[j]>key){
            div_update(divs[j],div_sizes[j],"red");
            //swap
            div_sizes[j+1] = div_sizes[j];
           // div_update(divs[j],div_sizes[j],"red");
            div_update(divs[j+1],div_sizes[j+1],"green");
            j=j-1;
        };
        div_sizes[j+1] = key;
        div_update(divs[j+1],div_sizes[j+1],"green");
    };
    enable_buttons();
}

function merge_sort(start, mid, end) {
    var p = start, q = mid + 1;
    var arr = [], k = 0;
    for (var i = start; i <= end; i++) {
        if (p > mid) {
            arr[k++] = div_sizes[q++];
            div_update(divs[q - 1], div_sizes[q - 1], "red");
        }
        else if (q > end) {
            arr[k++] = div_sizes[p++];
            div_update(divs[p - 1], div_sizes[p - 1], "red");
        }
        else if (div_sizes[p] < div_sizes[q]) {
            arr[k++] = div_sizes[p++];
            div_update(divs[p - 1], div_sizes[p - 1], "red");
        }

        else {
            arr[k++] = div_sizes[q++];
            div_update(divs[q - 1], div_sizes[q - 1], "red");
        }
    };

    for (var t = 0; t < k; t++) {
        div_sizes[start++] = arr[t];
        div_update(divs[start - 1], div_sizes[start - 1], "green");
    };

};

function merge_partition(start,end){
    if(start < end)
    {
        var mid= Math.floor((start + end) / 2);
        div_update(divs[mid],div_sizes[mid],"yellow");

        merge_partition(start,mid);
        merge_partition(mid+1,end);
        merge_sort(start,mid,end);
    };
};
const merge_sort_final =()=>{
    disable_buttons();
    merge_partition(0,array_size-1);
    enable_buttons();
}

inp_gen.addEventListener("click",generate_array);
inp_array_size.addEventListener("input",update_array_size);
inp_array_speed.addEventListener("input",set_speed);
window.onload = update_array_size();
bubble.addEventListener("click", bubble_sort);
selection.addEventListener("click",selection_sort);
insertion.addEventListener("click",insertion_sort)
merge.addEventListener("click",merge_sort_final)




