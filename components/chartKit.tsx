import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import { StyleSheet, Button } from 'react-native';
import React, { Component } from 'react';
import { Text, View } from '../components/Themed';
import { Dimensions } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
/* import { loadAllAssets } from '../components/ajaxRequest';
 */
const minValue = 900;
const maxValue = 1400;
var x = 0;
var values = [0];
function* yLabel() {
  console.log(x);
  console.log(values);
  yield* values;
  console.log(x);
}

const screenWidth = Dimensions.get('window').width;
export default class LineChartComponent extends Component {
  state = {
    loaded: false,
    json: {
      json: {
        liisunki: [],
        almunki: [],
        tutuki: [],
        labels: [],
      },
    },
  };

  componentDidMount() {
    x = 0;
    for (var i = minValue; i <= maxValue; i = i + 100) {
      console.log(i);
      values[x] = i;
      x++;
    }
    fetch('http://192.168.31.130:3000/piggieapp/get')
      .then((res) => res.json())
      .then((json) => {
        this.setState({ json: json, loaded: true });
      });
  }

  reload = () => {
    this.componentDidMount();
  };
  render() {
    var datasetIndex = -1;
    const yLabelIterator = yLabel();
    console.log(this.state.json.json);
    var piggieData = this.state.json.json;
    console.log(piggieData.almunki);
    const dataSet = [
      { data: piggieData.almunki },
      { data: piggieData.liisunki },
      { data: piggieData.tutuki },
      { data: [minValue] },
      { data: [maxValue] },
    ];
    /*  const dataPoints = {
      almunki: piggieData.almunki.map((datapoint) => datapoint - minValue - 1),
      liisunki: piggieData.liisunki.map(
        (datapoint) => datapoint - minValue - 1
      ),
      tutuki: piggieData.tutuki.map((datapoint) => datapoint - minValue - 1),
    }; */
    if (this.state.loaded) {
      return (
        <View style={styles.lineChart}>
          <LineChart
            data={{
              labels: piggieData.labels,
              datasets: [
                {
                  data: piggieData.almunki,
                  strokeWidth: 6,
                  color: (opacity = 1) =>
                    `rgba(102,51,0,${opacity})`,
                },
                {
                  data: piggieData.liisunki,
                  strokeWidth: 6,
                  color: (opacity = 1) =>
                    `rgba(255,255,255,${opacity})`,
                },
                {
                  data: piggieData.tutuki,
                  strokeWidth: 6,
                  color: (opacity = 1) =>
                    `rgba(255,128,0,${opacity})`,
                },
                {
                  data: [minValue],
                  strokeWidth: 0,
                },
                {
                  data: [maxValue],
                  strokeWidth: 0,
                },
              ],
              legend: ['Almunki', 'Liisunki', 'Tutuki'],
            }}
            width={piggieData.almunki.length * 70} // from react-native
            height={Dimensions.get('window').height - 500}
            yAxisLabel=''
            yAxisSuffix='g'
            withShadow={false}
            segments={x - 1}
            formatYLabel={() => yLabelIterator.next().value}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#2c3644',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#2c3644',
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) =>
                `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) =>
                `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '3',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            renderDotContent={({ x, y, index }) => {
              if (index === 0) datasetIndex++;
              {
                return (
                  <View
                    style={{
                      height: 24,
                      width: 34,
                      backgroundColor: '',
                      position: 'absolute',
                      top: y + 36, // <--- relevant to height / width (
                      left: x, // <--- width / 2
                    }}
                  >
                    <Text style={{ fontSize: 10 }}>
                      {dataSet[datasetIndex].data[index] +
                        'g'}
                    </Text>
                  </View>
                );
              }
            }}
          />
          <Button
            onPress={() => this.reload()}
            title='Refresh data'
            color='#841584'
            accessibilityLabel='Learn more about this purple button'
          />
        </View>
      );
    } else {
      return <View></View>;
    }
  }
}

const styles = StyleSheet.create({
  lineChart: {
    backgroundColor: '#2c3644',
  },
});
