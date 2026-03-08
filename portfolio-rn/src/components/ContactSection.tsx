import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

const socialLinks = [
  { icon: 'linkedin', url: 'https://www.linkedin.com/in/yukopangestu/', brand: true },
  { icon: 'github', url: 'https://github.com/yukopangestu', brand: true },
  { icon: 'medium', url: 'https://medium.com/@yuko.pangestu', brand: true },
  { icon: 'envelope', url: 'mailto:yuko.pangestu@gmail.com', brand: false },
];

export default function ContactSection() {
  const handleLink = (url: string) => Linking.openURL(url);

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Let's Connect</Text>
      <Text style={styles.subtitle}>
        I'm always interested in new opportunities and collaborations
      </Text>

      <View style={styles.contactItems}>
        <View style={styles.contactItem}>
          <FontAwesome5 name="envelope" size={22} color={Colors.white} />
          <TouchableOpacity onPress={() => handleLink('mailto:yuko.pangestu@gmail.com')}>
            <Text style={styles.contactLink}>yuko.pangestu@gmail.com</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contactItem}>
          <FontAwesome5 name="map-marker-alt" size={22} color={Colors.white} />
          <Text style={styles.contactText}>Jakarta, Indonesia</Text>
        </View>
      </View>

      <View style={styles.socialLinks}>
        {socialLinks.map(link => (
          <TouchableOpacity
            key={link.icon}
            style={styles.socialBtn}
            onPress={() => handleLink(link.url)}
          >
            {link.brand ? (
              <FontAwesome5 name={link.icon as any} size={20} color={Colors.white} brand />
            ) : (
              <FontAwesome5 name={link.icon as any} size={20} color={Colors.white} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © {new Date().getFullYear()} Yuko Pangestu. All rights reserved.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: 48,
    paddingHorizontal: 20,
    backgroundColor: Colors.darkBlue,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    marginBottom: 32,
  },
  contactItems: {
    width: '100%',
    gap: 16,
    marginBottom: 32,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  contactLink: {
    color: Colors.accent,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  contactText: {
    color: Colors.white,
    fontSize: 14,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 40,
  },
  socialBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
  },
});
