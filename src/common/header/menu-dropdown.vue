<template>
    <el-card header="看板导航" body-style="padding:0;height:400px;overflow:auto">
        <el-input placeholder="输入看板名称进行过滤..."></el-input>
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item name="1">
                <template slot="title">
                    个人看板
                    <i class="el-icon-information "></i>
                </template>
                <div>最近访问</div>
            </el-collapse-item>
            <el-collapse-item title="从服务器加载列表" name="2">
                <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
            </el-collapse-item>
            <el-collapse-item title="效率 Efficiency" name="3">
                <div>简化流程：设计简洁直观的操作流程；</div>
                <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
            </el-collapse-item>
        </el-collapse>
    </el-card>
</template>

<script>
export default {
    components: {

    },
    computed: {

    },
    data() {
        return {
            activeNames: ['1']
        }
    },
    methods: {
        handleChange(){}
    }
}
</script>

<style>
.el-card {
    border: none
}

.el-card__header {
    height: 30px;
    padding: 5px;
}

.el-collapse {
    padding: 0;
    margin: 0;
}
</style>
