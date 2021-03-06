var max,min,mask,imgCon,preImg;
        var x=0,
        y=0,
        pos=0,
        iconList=["../img/f1_icon.jpg","../img/f2_icon.jpg","../img/f3_icon.jpg","../img/f4_icon.jpg","../img/f5_icon.jpg","../img/f6_icon.jpg","../img/f7_icon.jpg","../img/f8_icon.jpg"],
        bnList=[];
        const MASK_WIDTH=303.75;
        const MIN_WIDTH=450;
        const MAX_WIDTH=540;
        const IMAGE_MARGIN=9;
        const IMAGE_WIDTH=56;

        var mainLeft=document.querySelector(".main-left");
        function ce(type,style){
            var elem=document.createElement(type);
            Object.assign(elem.style,style);
            return elem;
        }
        init();
        function init(){
            var zoom=ce("div",{
                position:'absolute'
            });
            createMin(zoom);
            createMax(zoom);
            createCarousel(zoom);
            mainLeft.appendChild(zoom);
        }

        function createMin(parent){
            min=ce("div",{
                position:"absolute",
                width:MIN_WIDTH+"px",
                height:MIN_WIDTH+"px",
                backgroundImage:"url(../img/f1.jpg)",
                backgroundSize:"100% 100%",
                border:"1px solid #CCCCCC"
            });
            mask=ce("div",{
                position:"absolute",
                width:MASK_WIDTH+"px",
                height:MASK_WIDTH+"px",
                display:"none",
                backgroundColor:"rgba(180,160,0,0.3)"
            })
            min.appendChild(mask);
            parent.appendChild(min);
            min.addEventListener("mouseenter",mouseHandler);
        }

        function createMax(parent){
            max=ce("div",{
                position:"absolute",
                width:MAX_WIDTH+"px",
                height:MAX_WIDTH+"px",
                backgroundImage:"url(../img/f1.jpg)",
                border:"1px solid #CCCCCC",
                display:"none",
                zIndex:3,
                left:MIN_WIDTH+1+"px"
            });
            parent.appendChild(max);
        }

        function createCarousel(parent){
            var div=ce("div",{
                position:"absolute",
                width:MIN_WIDTH+2+"px",
                height:"58px",
                top:MIN_WIDTH+2+"px"
            })
            var left=ce("div",{
                width:"22px",
                height:"32px",
                top:"13px",
                backgroundImage:"url(../img/sprite.png)",
                backgroundPositionX:"0px",
                backgroundPositionY:"-54px",
                position:"absolute",
            });
            // 复制标签 会将标签的所有标签属性完全复制
            var right=left.cloneNode(false);
            left.style.left="0px";//先复制以后再加
            Object.assign(right.style,{
                right:"0px",
                backgroundPositionX:"-78px",
                backgroundPositionY:"0px",
            })
            bnList.push(left);
            bnList.push(right);
            div.appendChild(left);
            div.appendChild(right);

            var con=ce("div",{
                position:"absolute",
                width:"380px",
                height:"58px",
                left:"36px",
                overflow:"hidden",
            })
            div.appendChild(con);
            createImageCon(con);
            parent.appendChild(div);
            div.addEventListener("click",clickHandler);
        }

        function createImageCon(parent){
            var width=iconList.length*IMAGE_WIDTH+iconList.length*IMAGE_MARGIN*2-IMAGE_MARGIN;
            imgCon=ce("div",{
                position:"absolute",
                width:width+"px",
                height:"58px",
                left:0,
                transition: "all 0.5s"
            });
            for(var i=0;i<iconList.length;i++){
                var img=ce("img",{
                    width:IMAGE_WIDTH-4+"px",
                    height:IMAGE_WIDTH-4+"px",
                    border:`2px solid rgba(255,0,0,${i==0 ? 1 : 0})`,
                    marginLeft:`${i===0 ? '0px' : IMAGE_MARGIN+"px"}`,
                    marginRight: IMAGE_MARGIN+"px"
                });
                img.src=iconList[i];
                if(i===0) preImg=img;
                imgCon.appendChild(img);
            }
            imgCon.addEventListener("mouseover",iconMouseHandler);
            parent.appendChild(imgCon);
        }

        function iconMouseHandler(e){
            if(e.target.nodeName!=="IMG") return;
            if(preImg){
                preImg.style.border="2px solid rgba(255,0,0,0)";
            }
            preImg=e.target;
            preImg.style.border="2px solid rgba(255,0,0,1)"
        //    console.log( e.target.src.replace("_icon",""));
            min.style.backgroundImage=max.style.backgroundImage=`url(${e.target.src.replace(/_icon/,"")})`;
        }

        function mouseHandler(e){
            if(e.type==="mouseenter"){
                mask.style.display=max.style.display="block"
                min.addEventListener("mouseleave",mouseHandler);
                min.addEventListener("mousemove",mouseHandler);
            }else if(e.type==="mousemove"){
                // 获取min块的相对视口位置，矩形
                move(e.clientX,e.clientY);
            }else if(e.type==="mouseleave"){
                mask.style.display=max.style.display="none"
                min.removeEventListener("mouseleave",mouseHandler);
                min.removeEventListener("mousemove",mouseHandler);
            }
        }


        function move(mouseX,mouseY){
            var rect=min.getBoundingClientRect();
                x=mouseX-MASK_WIDTH/2-rect.x;
                y=mouseY-MASK_WIDTH/2-rect.y;
                if(x<0) x=0;
                if(y<0) y=0;
                if(x>MIN_WIDTH-MASK_WIDTH) x=MIN_WIDTH-MASK_WIDTH;
                if(y>MIN_WIDTH-MASK_WIDTH) y=MIN_WIDTH-MASK_WIDTH;
                mask.style.left=x+"px";
                mask.style.top=y+"px";
                max.style.backgroundPositionX=-x*(MAX_WIDTH/MASK_WIDTH)+"px";
                max.style.backgroundPositionY=-y*(MAX_WIDTH/MASK_WIDTH)+"px";
        }


        function clickHandler(e){
            var index=bnList.indexOf(e.target)
            if(index<0) return
            if(index===0){
                pos--;
                if(pos<0) pos=0;
            //    imgCon.style.left="0px";
            }else{
                // imgCon.style.left="-380px";
                pos++;
                if(pos>Math.floor(iconList.length/5)){
                    pos=Math.floor(iconList.length/5)
                }
            }
      
            if(pos===Math.floor(iconList.length/5)){
                imgCon.style.left=-(imgCon.offsetWidth-380)+"px"
            }else{
                imgCon.style.left=pos*-380+"px";
            }
           
        }