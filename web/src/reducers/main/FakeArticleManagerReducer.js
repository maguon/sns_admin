import {handleActions} from 'redux-actions';
import {FakeArticleManagerActionType} from '../../types';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：文章编号
    conditionArticleId: '',
    // 检索条件：Fake用户
    conditionFakeUser: null,
    // 检索条件：文章类型
    conditionType: null,
    // 检索条件：载体类型
    conditionCarrier: null,
    // 检索条件：发布时间(始)
    conditionCreatedOnStart: '',
    // 检索条件：发布时间(终)
    conditionCreatedOnEnd: '',

    // 文章管理 结果列表
    articleArray: []
};

export default handleActions({
    [FakeArticleManagerActionType.getArticleList]: (state, action) => {
        return {
            ...state,
            articleArray: action.payload
        }
    },
    [FakeArticleManagerActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [FakeArticleManagerActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [FakeArticleManagerActionType.setConditionArticleId]: (state, action) => {
        return {
            ...state,
            conditionArticleId: action.payload
        }
    },
    [FakeArticleManagerActionType.setConditionFakeUser]: (state, action) => {
        return {
            ...state,
            conditionFakeUser: action.payload
        }
    },
    [FakeArticleManagerActionType.setConditionType]: (state, action) => {
        return {
            ...state,
            conditionType: action.payload
        }
    },
    [FakeArticleManagerActionType.setConditionCarrier]: (state, action) => {
        return {
            ...state,
            conditionCarrier: action.payload
        }
    },
    [FakeArticleManagerActionType.setConditionCreatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnStart: action.payload
        }
    },
    [FakeArticleManagerActionType.setConditionCreatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnEnd: action.payload
        }
    }
}, initialState)