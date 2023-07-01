<template>
    <div class="pagination">
        <button :disabled="pageNo == 1" @click="$emit('goPage', pageNo - 1)">上一页</button>
        <button v-if="startNumAndEndNum.startNum > 1" @click="$emit('goPage', 1)">1</button>
        <button v-if="startNumAndEndNum.startNum > 2">···</button>
        <button v-for="page in startNumAndEndNum.endNum" :key="page" v-if="page >= startNumAndEndNum.startNum"
            @click="$emit('goPage', page)" :class="{ pageNo: page == pageNo }">{{ page }}</button>
        <button v-if="startNumAndEndNum.endNum < totalPage - 1">···</button>
        <button v-if="startNumAndEndNum.endNum < totalPage" @click="$emit('goPage', totalPage)">{{ totalPage }}</button>
        <button @click="$emit('goPage', pageNo + 1)" :disabled="pageNo == totalPage">下一页</button>
        <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: ['pageNo', 'pageSize', 'total', 'totalPage'],
    computed: {
        startNumAndEndNum() {
            let { totalPage = 0, pageNo = 0 } = this
            let startNum = 1, endNum = 1
            if (totalPage < 5) {
                startNum = 1
                endNum = totalPage
            }
            else {
                startNum = pageNo - 2
                endNum = pageNo + 2
                if (startNum < 1) {
                    startNum = 1
                    endNum = 5
                }
                if (endNum > totalPage) {
                    startNum = totalPage - 4
                    endNum = totalPage
                }
            }
            return { startNum, endNum }
        }
    }
}
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;

    .pageNo {
        background-color: skyblue;
    }

    button {


        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>