import React, { forwardRef, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomIcon from '../CustomIcon';
import { get, typeMap } from '@/utils';
import { Popup, Icon, Keyboard } from 'zarm';
import cx from 'classnames';
import dayjs from 'dayjs';
import PopupDate from '../PopupDate';
import s from './style.module.less';

const PopupAddBill = forwardRef((props, ref) => {
    const dateRef = useRef();
    const [show, setShow] = useState(false); // 内部控制弹窗显示隐藏
    const [payType, setPayType] = useState('expense');   // 支出或收入类型
    const [amount, setAmount] = useState(''); // 账单价格
    const [date, setDate] = useState(new Date()); // 日期
    const [currentType, setcurrentType] = useState({}); // 当前选中账单类型
    const [expense, setExpense] = useState([]); // 支出类型数据
    const [income, setIncome] = useState([]); // 收入类型数据
    useEffect(async () => {
        const { data: { list } } = await get('/api/type/list');
        const _expense = list.filter(i => i.type == 1); // 支出类型
        const _income = list.filter(i => i.type == 2); // 收入类型
        setExpense(_expense);
        setIncome(_income);
        setcurrentType(_expense[0]); // 新建账单，类型默认是支出类型数组的第一项
    }, [])
    // 通过 forwardRef 拿到外部传入的 ref, 并添加属性, 使得父组件可以通过 ref 控制子组件
    if (ref) {
        ref.current = {
            show: () => {
                setShow(true);
            },
            close: () => {
                setShow(false);
            }
        }
    };

    // 切换收入还是支出
    const changeType = (type) => {
        setPayType(type);
        // 切换之后，默认给相应类型的第一个值
        // if (type == 'expense') {

        // }
    }

    // 日期弹窗
    const handleDatePop = () => {
        dateRef.current && dateRef.current.show();
    }

    // 日期选择回调
    const selectDate = (val) => {
        setDate(val);
    }

    // 监听输入框改变值
    const handleMoney = (value) => {
        value = String(value);
        if (value == 'close') return ;
        // 点击是删除按钮时
        if (value == 'delete') {
            let _amount = amount.slice(0, amount.length - 1);
            setAmount(_amount);
            return ;
        }

        // 点击确认按钮时
        if (value == 'ok') {
            // 这里后续将处理添加账单逻辑
            return ;
        }

        // 当输入的值为'.' 且已经存在'.'，则不让其继续字符串相加。
        if (value == '.' && amount.includes('.')) return;
        // 小数点后保留两位，当超过两位时，不让其字符串继续相加
        if (value != '.' && amount.includes('.') && amount && amount.split('.')[1].length >= 2) return;
        // amount += value
        setAmount(amount + value);
    }
    return <Popup
            visible={show}
            direction='bottom'
            onMaskClick={() => setShow(false)}
            destroy={false}
            mountContainer={() => document.body}
        >
            <div className={s.addWrap}>
                <header className={s.header}>
                    <span className={s.close} onClick={() => setShow(false)}><Icon type='wrong' /></span>
                </header>
                <div className={s.filter}>
                    <div className={s.type}>
                        <span onClick={() => changeType('expense')} className={cx({ [s.expense]: true, [s.active]: payType == 'expense'})}>支出</span>
                        <span onClick={() => changeType('income')} className={cx({ [s.income]: true, [s.active]: payType == 'income'})}>收入</span>
                    </div>
                    <div className={s.time} onClick={() => dateRef.current && dateRef.current.show()}>{dayjs(date).format('MM-DD')} <Icon className={s.arrow} type='arrow-bottom'/></div>
                </div>
                <div className={s.money}>
                    <span className={s.sufix}>¥</span>
                    <span className={cx(s.amount, s.animation)}>{amount}</span>
                </div>
                <div className={s.typeWarp}>
                    <div className={s.typeBody}>
                    {
                        (payType == 'expense' ? expense : income).map(item => <div onClick={() => choseType(item)} key={item.id} className={s.typeItem}>
                        <span className={cx({[s.iconfontWrap]: true, [s.expense]: payType == 'expense', [s.income]: payType == 'income', [s.active]: currentType.id == item.id})}>
                            <CustomIcon className={s.iconfont} type={typeMap[item.id].icon} />
                        </span>
                        <span>{item.name}</span>
                        </div>)
                    }
                    </div>
                </div>
                <Keyboard type="price" onKeyClick={(value) => handleMoney(value)} />
                <PopupDate ref={dateRef} onSelect={selectDate} />
            </div>
        </Popup>
})

export default PopupAddBill
