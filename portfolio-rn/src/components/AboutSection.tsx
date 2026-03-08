import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

const stats = [
  { number: '8+', label: 'Years Experience' },
  { number: '10+', label: 'Technologies' },
  { number: '20+', label: 'Projects Delivered' },
  { number: '4+', label: 'Team Members Led' },
];

export default function AboutSection() {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>About Me</Text>
      <Text style={styles.subtitle}>
        Technical Lead with 8+ years of experience in full-stack development
      </Text>

      <View style={styles.statsGrid}>
        {stats.map(stat => (
          <View key={stat.label} style={styles.statCard}>
            <Text style={styles.statNumber}>{stat.number}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.content}>
        <Text style={styles.contentTitle}>Building Digital Excellence</Text>
        <Text style={styles.contentText}>
          As a Technical Lead at Paper.id, I orchestrate the development of innovative solutions
          while mentoring a diverse team of engineers. My journey in tech has equipped me with a
          comprehensive skill set spanning from backend architecture to frontend implementation.
        </Text>
        <Text style={styles.contentText}>
          I specialize in creating scalable web applications, implementing microservices
          architectures, and ensuring code quality across teams. My approach combines technical
          expertise with strong leadership to deliver products that make a difference.
        </Text>
        <Text style={styles.contentText}>
          I also help the product team calculate and provide solutions about what they want to
          build.
        </Text>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    width: '47.5%',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: Colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.primaryBlue,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.gray,
    textAlign: 'center',
  },
  content: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    shadowColor: Colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.darkBlue,
    marginBottom: 12,
  },
  contentText: {
    fontSize: 14,
    color: Colors.darkGray,
    lineHeight: 22,
    marginBottom: 12,
  },
});
