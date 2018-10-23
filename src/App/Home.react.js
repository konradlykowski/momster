import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {ToastAndroid, ScrollView, Platform, Animated, Easing, View} from 'react-native';

import routes from '../routes';

import Container from '../Container';
// components
import {
    ActionButton,
    Avatar,
    ListItem,
    Toolbar,
    BottomNavigation,
    Icon,
} from '../react-native-material-ui/src';

const UP = 1;
const DOWN = -1;

const propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

class Home extends Component {
    constructor(props) {
        super(props);

        this.offset = 0;
        this.scrollDirection = 0;

        this.state = {
            selected: [],
            searchText: '',
            active: 'people',
            moveAnimated: new Animated.Value(0),
        };
    }

    onAvatarPressed = (value) => {
        const {selected} = this.state;

        const index = selected.indexOf(value);

        if (index >= 0) {
            // remove item
            selected.splice(index, 1);
        } else {
            // add item
            selected.push(value);
        }

        this.setState({selected});
    }
    onScroll = (ev) => {
        const currentOffset = ev.nativeEvent.contentOffset.y;

        const sub = this.offset - currentOffset;

        // don't care about very small moves
        if (sub > -2 && sub < 2) {
            return;
        }

        this.offset = ev.nativeEvent.contentOffset.y;

        const currentDirection = sub > 0 ? UP : DOWN;

        if (this.scrollDirection !== currentDirection) {
            this.scrollDirection = currentDirection;

            this.setState({
                bottomHidden: currentDirection === UP,
            });
        }
    }
    show = () => {
        Animated.timing(this.state.moveAnimated, {
            toValue: 0,
            duration: 225,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
            useNativeDriver: Platform.OS === 'android',
        }).start();
    }
    hide = () => {
        Animated.timing(this.state.moveAnimated, {
            toValue: 56, // because the bottom navigation bar has height set to 56
            duration: 195,
            easing: Easing.bezier(0.4, 0.0, 0.6, 1),
            useNativeDriver: Platform.OS === 'android',
        }).start();
    }
    renderToolbar = () => {
        if (this.state.selected.length > 0) {
            return (
                <Toolbar
                    key="toolbar"
                    leftElement="clear"
                    onLeftElementPress={() => this.setState({selected: []})}
                    centerElement={this.state.selected.length.toString()}
                    rightElement={['delete']}
                    style={{
                        container: {backgroundColor: 'red'},
                        titleText: {color: 'red'},
                        leftElement: {color: 'red'},
                        rightElement: {color: 'red'},
                    }}
                />
            );
        }
        return (
            <Toolbar
                key="toolbar"
                leftElement=""
                onLeftElementPress={() => this.props.navigation.goBack()}
                centerElement="Hello, Super Mama!"
                searchable={{

                    autoFocus: true,
                    placeholder: 'Talk to Super Mama...',
                    onChangeText: value => this.setState({searchText: value}),
                    onSearchClosed: () => this.setState({searchText: ''}),
                }}
            />
        );
    }

    renderAllTheMamas = () => {
        return <ScrollView
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="interactive"
            onScroll={this.onScroll}
        >
            {this.renderItem('Mom1', 'actionButton')}
            {this.renderItem('Mom1', 'actionButton')}
            {this.renderItem('Mom1', 'actionButton')}
            {this.renderItem('Mom1', 'actionButton')}
            {this.renderItem('Mom1', 'actionButton')}
            {this.renderItem('Mom1', 'actionButton')}
            {this.renderItem('Mom1', 'actionButton')}
            {this.renderItem('Mom1', 'actionButton')}
            {this.renderItem('Mom1', 'actionButton')}
            {this.renderItem('Mom1', 'actionButton')}
            {this.renderItem('Mom1', 'actionButton')}
            {this.renderItem('Mom1', 'actionButton')}
            {this.renderItem('Mom1', 'actionButton')}
            {this.renderItem('Mom1', 'actionButton')}
            {this.renderItem('Mom1', 'actionButton')}
            {this.renderItem('Mom1', 'actionButton')}



        </ScrollView>;
    }

    renderTopNavigation = () => {
        return <BottomNavigation
            active={this.state.active}
            hidden={this.state.bottomHidden}
            style={{container: {position: 'absolute', top: 0, left: 0, right: 0}}}
        >
            <BottomNavigation.Action
                key="myProfile"
                icon={<Icon name="person"/>}
                label="MY PROFILE"
                onPress={() => this.setState({active: 'myProfile'})}
            />
            <BottomNavigation.Action
                key="people"
                icon="people"
                label="HEY, MAMA!"
                onPress={() => this.setState({active: 'people'})}
            />
            <BottomNavigation.Action
                key="bookmark-border"
                icon="bookmark-border"
                label="TIMELINE"
                onPress={() => this.setState({active: 'bookmark-border'})}
            />
        </BottomNavigation>;
    }

    renderItem = (title, route) => {
        const searchText = this.state.searchText.toLowerCase();

        if (searchText.length > 0 && title.toLowerCase().indexOf(searchText) < 0) {
            return null;
        }

        return (
            <ListItem
                divider
                leftElement={<Avatar text={title[0]}/>}
                onLeftElementPress={() => this.onAvatarPressed(title)}
                centerElement={title}
                onPress={() => this.props.navigation.navigate(route)}
            />

        );
    }

    render() {
        if (this.state.active === 'people') {
            return (
                <Container>
                    {this.renderToolbar()}
                    {this.renderAllTheMamas()}
                    {this.renderTopNavigation()}
                </Container>
            )
        }
        else
            return (
                <Container>
                    {this.renderToolbar()}
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon name={this.state.active} size={54}/>
                    </View>
                    <ScrollView
                        keyboardShouldPersistTaps="always"
                        keyboardDismissMode="interactive"
                        onScroll={this.onScroll}
                    >
                        {this.renderItem('Mom1', 'actionButton')}
                        {this.renderItem('Mom1', 'avatar')}
                        {this.renderItem('Mom1', 'badge')}
                        {this.renderItem('Mom1', 'bottomNavigation')}
                        {this.renderItem('Mom1', 'button')}
                        {this.renderItem('Mom1', 'card')}
                        {this.renderItem('Mom1', 'checkbox')}
                        {this.renderItem('Mom1', 'dialog')}
                        {this.renderItem('Mom1', 'drawer')}
                        {this.renderItem('Mom1', 'iconToggle')}
                        {this.renderItem('Mom1', 'list')}
                        {this.renderItem('Mom1', 'radioButton')}
                        {this.renderItem('Mom1', 'toolbar')}
                    </ScrollView>
                    <ActionButton
                        actions={[
                            {icon: 'share', label: 'Share'},
                        ]}
                        hidden={this.state.bottomHidden}
                        icon="share"
                        transition="speedDial"
                        onPress={(action) => {
                            if (Platform.OS === 'android') {
                                ToastAndroid.show(action, ToastAndroid.SHORT);
                            }
                        }}
                        style={{
                            positionContainer: {bottom: 76},
                        }}
                    />
                    {this.renderTopNavigation()}
                </Container>


            );
    }
}

Home.propTypes = propTypes;

export default Home;
