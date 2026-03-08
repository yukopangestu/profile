import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { experiences } from '../data';

export default function ExperienceSection() {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Professional Journey</Text>
      <Text style={styles.subtitle}>My career progression and achievements</Text>

      <View style={styles.timeline}>
        {experiences.map((exp, index) => (
          <View key={index} style={styles.timelineItem}>
            <View style={styles.lineColumn}>
              <View style={styles.dot} />
              {index < experiences.length - 1 && <View style={styles.line} />}
            </View>

            <View style={styles.card}>
              <Text style={styles.role}>{exp.role}</Text>
              <View style={styles.meta}>
                <FontAwesome5 name="building" size={11} color={Colors.gray} />
                <Text style={styles.company}> {exp.company}</Text>
                <Text style={styles.separator}>  ·  </Text>
                <Text style={styles.period}>{exp.period}</Text>
              </View>
              {exp.achievements.map((item, i) => (
                <View key={i} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.listText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: 48,
    paddingHorizontal: 20,
    backgroundColor: Colors.veryLightBlue,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.darkBlue,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: 32,
  },
  timeline: {},
  timelineItem: {
    flexDirection: 'row',
    gap: 16,
  },
  lineColumn: {
    alignItems: 'center',
    width: 14,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.primaryBlue,
    borderWidth: 2,
    borderColor: Colors.white,
    shadowColor: Colors.primaryBlue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 6,
    zIndex: 1,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.lightBlue,
    marginTop: 4,
    marginBottom: -4,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  role: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.darkBlue,
    marginBottom: 4,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  company: {
    fontSize: 12,
    color: Colors.gray,
    fontWeight: '500',
  },
  separator: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  period: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bullet: {
    fontSize: 13,
    color: Colors.primaryBlue,
    marginRight: 6,
    lineHeight: 20,
  },
  listText: {
    fontSize: 12,
    color: Colors.darkGray,
    flex: 1,
    lineHeight: 20,
  },
});
