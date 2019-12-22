import React from 'react';
import { ScrollView, ScrollViewProps, StyleSheet } from 'react-native';

export type ContainerViewProps = ScrollViewProps;

/**
 * React Native ScrollView component, but modified to remove bounces by default
 *
 * Used everywhere per app, where content needs to be scrollable to fit layout to device screen
 */
export class ContainerView extends React.Component<ContainerViewProps> {
  public render(): React.ReactElement<ScrollViewProps> {
    return (
      <ScrollView
        bounces={true}
        bouncesZoom={false}
        alwaysBounceVertical={true}
        alwaysBounceHorizontal={false}
        {...this.props}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 16
    // flex: 1
  },
  contentContainer: {
    flex: 1
  },
  formContainer: {
    flex: 1,
    marginTop: 40
  },
  addButton: {
    // marginVertical: 24
  }
});
