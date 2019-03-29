<template>
    <div class="cropper_pages">
        <section class="cropper_finsh" @click="cropperFinshAction">完成</section>
        <div class="cropper_section">
            <vueCropper
                    ref="cropper"
                    :img="cropper_image"
                    :outputSize="option.size"
                    :outputType="option.outputType"
                    :info="true"
                    :full="option.full"
                    :canMove="option.canMove"
                    :canMoveBox="option.canMoveBox"
                    :original="option.original"
                    :autoCrop="option.autoCrop"
                    :autoCropWidth="option.autoCropWidth"
                    :autoCropHeight="option.autoCropHeight"
                    :canScale="option.canScale"
                    :fixedBox="option.fixedBox"
                    mode="cover"
            ></vueCropper>
        </div>
    </div>

</template>

<script>
    import { VueCropper }  from 'vue-cropper'

    export default {
        name: "cropper-component",
        data(){
            return{
                option:{
                    img: '',
                    outputSize:1, //剪切后的图片质量（0.1-1）
                    full: false,//输出原图比例截图 props名full
                    outputType: 'png',
                    canMove: true,/// 上传图片是否可以移动
                    original: true,
                    canMoveBox: true,/// 截图框能否拖动
                    autoCrop: true,/// 是否默认生成截图框
                    autoCropWidth:150,/// 默认生成截图框宽度
                    autoCropHeight:150,///
                    canScale:true,/// 图片是否允许滚轮缩放
                    centerBox:true,//// 截图框是否被限制在图片里面
                    fixedBox:false,

                }
            }
        },
        props:['cropper_image'],
        components:{VueCropper},
        methods:{
            cropperFinshAction(){
                this.$refs.cropper.getCropData((data) => {
                   this.$emit('cropperaction',data);
                });

            }
        },
    }
</script>

<style lang="scss" scoped>

    @import "../style/mixin";
    .cropper_pages {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0rem;
        z-index: 9999;
        background-color: rgba(1,1,1,0.5);
    }
    .cropper_section{
        width: 100%;
        height: 50%;
        @include center;
    }
    .cropper_finsh {
        position: absolute;
        right: .3rem;
        top: .2rem;
        @include sc(.7rem,white);
        background-color: #3190e8;
        border-radius: .4rem;
        padding: .4rem .8rem;
    }

</style>
